import { RectButtonProps } from "react-native-gesture-handler";

import {
  Button,
  Container,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
  StatusTypesProps,
} from "./styles";

interface OrderCardProps extends RectButtonProps {
  index: number;
  status: StatusTypesProps;
}

export type { StatusTypesProps };

export function OrderCard({
  index,
  status = "Preparando",
  ...rest
}: OrderCardProps) {
  return (
    <Container index={index}>
      <Button {...rest}>
        <Image source={{ uri: "https://github.com/carlosallexandre.png" }} />

        <Name>Nome</Name>
        <Description>Mesa 5 . Qnt: 1</Description>

        <StatusContainer status={status}>
          <StatusLabel status={status}>{status}</StatusLabel>
        </StatusContainer>
      </Button>
    </Container>
  );
}
