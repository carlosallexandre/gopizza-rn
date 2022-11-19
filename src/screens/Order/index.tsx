import { useState } from "react";
import { Platform } from "react-native";

import { OrderScreenProps } from "@dtos/navigation";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { PIZZA_TYPES } from "@utils/pizzaTypes";

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from "./styles";

export function Order() {
  const [size, setSize] = useState("");

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={() => {}} />
        </Header>

        <Photo source={{ uri: "https://github.com/carlosallexandre.png" }} />

        <Form>
          <Title>Nome da pizza</Title>

          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((type) => (
              <RadioButton
                key={type.id}
                isSelected={type.id === size}
                onPress={() => setSize(type.id)}
              >
                {type.name}
              </RadioButton>
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button>Confirmar pedido</Button>
        </Form>
      </ContentScroll>
    </Container>
  );
}
