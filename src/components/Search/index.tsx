import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Button, ButtonClear, Container, Input, InputArea } from "./styles";

interface SearchProps extends TextInputProps {
  onClear(): void;
  onSearch(): void;
}

export function Search({ onSearch, onClear, ...rest }: SearchProps) {
  const theme = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar" {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={theme.COLORS.TITLE} />
      </Button>
    </Container>
  );
}
