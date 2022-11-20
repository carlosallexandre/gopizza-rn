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

export interface OrderProps {
  id: string;
  waiter_id: string;
  quantity: string;
  pizza_name: string;
  pizza_image: string;
  table_number: string;
  status: StatusTypesProps;
}

interface OrderCardProps extends RectButtonProps {
  index: number;
  data: OrderProps;
}

export type { StatusTypesProps };

export function OrderCard({ index, data, ...rest }: OrderCardProps) {
  return (
    <Container index={index}>
      <Button {...rest}>
        <Image source={{ uri: data.pizza_image }} />

        <Name>{data.pizza_name}</Name>
        <Description>
          Mesa {data.table_number} . Qnt: {data.quantity}
        </Description>

        <StatusContainer status={data.status}>
          <StatusLabel status={data.status}>{data.status}</StatusLabel>
        </StatusContainer>
      </Button>
    </Container>
  );
}
