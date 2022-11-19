import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButtonProps } from "react-native-gesture-handler";

import { Container, Button } from "./styles";

interface ButtonBackProps extends BorderlessButtonProps {}

export function ButtonBack(props: ButtonBackProps) {
  const theme = useTheme();

  return (
    <Container>
      <Button {...props}>
        <MaterialIcons
          size={18}
          name="chevron-left"
          color={theme.COLORS.TITLE}
        />
      </Button>
    </Container>
  );
}
