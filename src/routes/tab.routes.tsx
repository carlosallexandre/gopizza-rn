import { useEffect, useState } from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import firestore from "@react-native-firebase/firestore";

import { useAuth } from "@hooks/auth";
import { useTheme } from "styled-components/native";

import { BottomMenu } from "@components/BottomMenu";

import { Home } from "@screens/Home";
import { Orders } from "@screens/Orders";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("orders")
      .where("status", "==", "Pronto")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((snapshot) => setNotifications(snapshot.docs.length));

    return unsubscribe;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        tabBarStyle: {
          height: 72,
          paddingBottom: getBottomSpace(),
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon({ color }) {
            return <BottomMenu color={color} title="Cardápio" />;
          },
        }}
      />

      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon({ color }) {
            return (
              <BottomMenu
                color={color}
                title="Pedidos"
                notifications={notifications}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
