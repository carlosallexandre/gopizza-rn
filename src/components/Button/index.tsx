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
  ...rest
}: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      {isLoading ? <Loading /> : <Title>{children}</Title>}
    </Container>
  );
}
