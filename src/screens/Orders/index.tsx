import { useState } from "react";
import { FlatList } from "react-native";

import { OrderCard, StatusTypesProps } from "@components/OrderCard";

import { Container, Header, Title, Divider } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface Order {
  id: string;
  status: StatusTypesProps;
}

export function Orders() {
  const navigation = useNavigation();

  const [orders, setOrders] = useState<Order[]>([
    { id: "1", status: "Preparando" },
    { id: "2", status: "Pronto" },
    { id: "3", status: "Entregue" },
    { id: "4", status: "Preparando" },
    { id: "5", status: "Preparando" },
  ]);

  function handleOpenOrder(orderId: string) {
    return () => navigation.navigate("order", { id: orderId });
  }

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            status={item.status}
            onPress={handleOpenOrder(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <Divider />}
      />
    </Container>
  );
}
