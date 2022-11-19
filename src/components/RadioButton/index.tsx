import { RectButtonProps } from "react-native-gesture-handler";

import { Button, Container, Radio, Selected, Title } from "./styles";

interface RadioButtonProps extends RectButtonProps {
  isSelected?: boolean;
  children: string;
}

export function RadioButton({
  isSelected = false,
  children,
  ...rest
}: RadioButtonProps) {
  return (
    <Container isSelected={isSelected}>
      <Button isSelected={isSelected} {...rest}>
        <Radio>{isSelected && <Selected />}</Radio>
        <Title>{children}</Title>
      </Button>
    </Container>
  );
}
