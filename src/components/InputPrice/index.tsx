import { TextInputProps } from "react-native";

import { Container, Size, Label, Input } from "./styles";

interface InputPriceProps extends TextInputProps {
  size: "P" | "M" | "G";
}

export function InputPrice({ size, ...rest }: InputPriceProps) {
  return (
    <Container>
      <Size>
        <Label>{size}</Label>
      </Size>

      <Label>R$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Container>
  );
}
