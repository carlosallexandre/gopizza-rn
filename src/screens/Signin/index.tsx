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

export function Signin() {
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
          />

          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button type="secondary">Entrar</Button>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
