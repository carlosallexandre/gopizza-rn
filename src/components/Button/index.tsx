import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title, Loading, TypeProps } from "./styles";

interface ButtonProps extends RectButtonProps {
  isLoading?: boolean;
  type?: TypeProps;
  children: string;
}

export function Button({
  isLoading = false,
  type = "primary",
  children,
  onPress,
  ...rest
}: ButtonProps) {
  function handlePress(pointerInside: boolean) {
    if (isLoading) return;

    if (onPress) onPress(pointerInside);
  }

  return (
    <Container type={type} onPress={handlePress} {...rest}>
      {isLoading ? <Loading /> : <Title>{children}</Title>}
    </Container>
  );
}
