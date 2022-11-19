import { useState, useCallback } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import firestore from "@react-native-firebase/firestore";

import { HomeScreenProps } from "@dtos/navigation";

import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";

import happyEmoji from "@assets/happy.png";

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  MenuTitle,
  NewProductButton,
} from "./styles";

export function Home({ navigation, route }: HomeScreenProps) {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductProps[]>([]);

  async function fetchPizzas(value: string = "") {
    const formattedValue = value.toLowerCase().trim();

    try {
      const response = await firestore()
        .collection("pizzas")
        .orderBy("name_insensitive")
        .startAt(formattedValue)
        .endAt(`${formattedValue}\uf8ff`)
        .get();

      setProducts(
        response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductProps[]
      );
    } catch (err) {
      console.error(err);
    }
  }

  function handleSearchClear() {
    setSearch("");
    return fetchPizzas("");
  }

  function handleSearch() {
    return fetchPizzas(search);
  }

  function handleOpenProduct(productId: string) {
    return () => navigation.navigate("product", { id: productId });
  }

  function handleAddProduct() {
    return () => navigation.navigate("product");
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={theme.COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search
        value={search}
        onChangeText={setSearch}
        onClear={handleSearchClear}
        onSearch={handleSearch}
      />

      <MenuHeader>
        <MenuTitle>Cardápio</MenuTitle>
        <MenuItemsNumber>
          {products.length === 1 && "1 pizza"}
          {products.length > 1 && `${products.length} pizzas`}
        </MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={handleOpenProduct(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      <NewProductButton type="secondary" onPress={handleAddProduct()}>
        Cadastrar Pizza
      </NewProductButton>
    </Container>
  );
}
