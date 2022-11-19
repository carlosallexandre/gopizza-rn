import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Content,
  Description,
  Details,
  Divider,
  Identification,
  Image,
  Name,
} from "./styles";

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  image: { url: string };
}

interface ProductCardProps extends RectButtonProps {
  data: ProductProps;
}

export function ProductCard({ data, ...rest }: ProductCardProps) {
  const theme = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.image.url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather
              name="chevron-right"
              size={18}
              color={theme.COLORS.SHAPE}
            />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>
      <Divider />
    </Container>
  );
}
