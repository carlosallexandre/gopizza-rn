import { KeyboardAvoidingView, Platform } from "react-native";

import brandImg from "@assets/brand.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import {
  Brand,
  Container,
  Content,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  Title,
} from "./styles";
import { useState } from "react";
import { useAuth } from "hooks/auth";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticating, signIn, forgotPassword } = useAuth();

  function handleSigin() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            type="secondary"
            onPress={handleSigin}
            isLoading={isAuthenticating}
          >
            Entrar
          </Button>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
