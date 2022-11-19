import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextData {
  user: User | null;
  isAuthenticating: boolean;
  signOut(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_COLLECTION = "@gopizza:user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o email e senha.");
    }

    try {
      setIsAuthenticating(true);
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      const doc = await firestore().collection("users").doc(user.uid).get();
      const userData: User = {
        id: doc.id,
        name: doc.data()?.name,
        isAdmin: doc.data()?.isAdmin,
      };

      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
      setUser(userData);
    } catch (err: any) {
      switch (err?.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          Alert.alert("Login", "Email e/ou senha inválido.");
          break;
        default:
          console.error(err?.code);
          Alert.alert("Login", "Não foi possível realizar o login.");
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function signOut() {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem(USER_COLLECTION);
      setUser(null);
    } catch (err) {}
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinir senha", "Informe o e-mail");
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Redefinir senha",
        "Enviamos um link de redefinição de senha para o seu email"
      );
    } catch (err) {
      Alert.alert("Redefinir senha", "Não foi possível redefinir a sua senha");
    }
  }

  async function loadUserFromAsyncStorage() {
    try {
      setIsAuthenticating(true);
      const storedUser = await AsyncStorage.getItem(USER_COLLECTION);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  }

  useEffect(() => {
    loadUserFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticating, signIn, signOut, forgotPassword, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("`useAuth` must be used into AuthProvider");

  return ctx;
}
