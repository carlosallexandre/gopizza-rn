import { FlatList } from "react-native";
import { useState, useEffect } from "react";

import { useAuth } from "@hooks/auth";
import { useNavigation } from "@react-navigation/native";

import firestore from "@react-native-firebase/firestore";

import { OrderCard, OrderProps } from "@components/OrderCard";

import { Container, Header, Title, Divider } from "./styles";
import { Alert } from "react-native";

export function Orders() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection<Omit<OrderProps, "id">>("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

    return unsubscribe;
  }, []);

  function deliveryPizza(orderId: string) {
    return () =>
      firestore().collection("orders").doc(orderId).update({
        status: "Entregue",
      });
  }

  function handleDeliveryPizza(orderId: string) {
    return () => {
      Alert.alert("Pedido", "O pedido foi realmente entregue?", [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: deliveryPizza(orderId) },
      ]);
    };
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
            data={item}
            index={index}
            enabled={item.status !== "Entregue"}
            onPress={handleDeliveryPizza(item.id)}
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
