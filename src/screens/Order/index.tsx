import { useMemo, useState, useEffect } from "react";
import { Alert, Platform } from "react-native";

import { RootStackParamList } from "@routes/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import firestore from "@react-native-firebase/firestore";

import { useAuth } from "@hooks/auth";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import { formatCurrency } from "@utils/formatCurrency";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from "./styles";

interface Product {
  name: string;
  image: {
    url: string;
  };
  price_sizes: {
    p: string;
    m: string;
    g: string;
  };
}

export function Order() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "order">>();

  const [isCreating, setIsCreating] = useState(false);
  const [amount, setAmount] = useState(1);
  const [tableNumber, setTableNumber] = useState("1");
  const [size, setSize] = useState<"p" | "m" | "g">("m");
  const [product, setProduct] = useState<Product | null>(null);

  const orderTotal = useMemo(
    () =>
      formatCurrency(
        Number(product?.price_sizes[size] || 0) * Number(amount || 0)
      ),
    [product, amount]
  );

  async function fetchPizza(id: string) {
    try {
      const response = await firestore()
        .collection<Product>("pizzas")
        .doc(id)
        .get();

      setProduct(response.exists ? response.data()! : null);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const productId = route?.params?.id;
    if (!productId) return;
    fetchPizza(productId);
  }, [route]);

  async function handleOrder() {
    if (!size || !tableNumber || !amount) {
      return Alert.alert("Pedido", "Por favor, preencha todos os campos.");
    }

    try {
      setIsCreating(true);

      await firestore().collection("orders").add({
        pizza_name: product?.name,
        pizza_image: product?.image.url,
        waiter_id: user?.id,

        size,
        quantity: amount,
        amount: orderTotal,
        status: "Preparando",
        table_number: tableNumber,
      });

      navigation.goBack();
    } catch (err) {
      console.error(err);
      setIsCreating(false);
      Alert.alert("Pedido", "Não foi possível realizar o pedido.");
    }
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={navigation.goBack} />
        </Header>

        <Photo source={{ uri: product?.image?.url }} />

        <Form>
          <Title>{product?.name}</Title>

          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((type) => (
              <RadioButton
                key={type.id}
                isSelected={type.id === size}
                onPress={() => setSize(type.id as "p" | "m" | "g")}
              >
                {type.name}
              </RadioButton>
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType="numeric"
                value={tableNumber}
                onChangeText={setTableNumber}
                style={{ textAlign: "center", paddingLeft: -20 }}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={(val) => setAmount(Number(val))}
                style={{ textAlign: "center", paddingLeft: -20 }}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {orderTotal}</Price>

          <Button isLoading={isCreating} onPress={handleOrder}>
            Confirmar pedido
          </Button>
        </Form>
      </ContentScroll>
    </Container>
  );
}
