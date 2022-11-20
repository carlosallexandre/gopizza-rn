import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

import type { ProductScreenProps } from "@routes/types";

import { Input } from "@components/Input";
import { Photo } from "@components/Photo";
import { Button } from "@components/Button";
import { ButtonBack } from "@components/ButtonBack";
import { InputPrice } from "@components/InputPrice";

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from "./styles";

interface Product {
  id: string;
  name: string;
  name_insensitive: string;
  description: string;
  image: {
    path: string;
    url: string;
  };
  price_sizes: {
    p: string;
    m: string;
    g: string;
  };
}

export function Product({ navigation, route }: ProductScreenProps) {
  const hasProduct = useMemo(() => !!route.params?.id, [route]);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");

  async function handleDelete() {
    try {
      await firestore().collection("pizzas").doc(route.params?.id).delete();
      await storage().ref(imagePath).delete();
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProduct(id: string) {
    try {
      const doc = await firestore().collection<Product>("pizzas").doc(id).get();

      const data = doc.data();
      setName(data?.name ?? "");
      setImage(data?.image.url ?? "");
      setImagePath(data?.image.path ?? "");
      setDescription(data?.description ?? "");
      setPriceSizeP(data?.price_sizes.p ?? "");
      setPriceSizeM(data?.price_sizes.m ?? "");
      setPriceSizeG(data?.price_sizes.g ?? "");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const productId = route.params?.id;
    if (productId) fetchProduct(productId);
  }, [route]);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza.");
    }

    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza.");
    }

    if (!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza.");
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert("Cadastro", "Informe o preço de todos os tamanhos.");
    }

    try {
      setIsLoading(true);

      const fileName = new Date().getTime();
      const ref = storage().ref(`/pizzas/${fileName}.png`);
      await ref.putFile(image);

      const img_url = await ref.getDownloadURL();

      await firestore()
        .collection("pizzas")
        .add({
          name,
          name_insensitive: name.toLowerCase().trim(),
          description,
          price_sizes: {
            p: priceSizeP,
            m: priceSizeM,
            g: priceSizeG,
          },
          image: {
            url: img_url,
            path: ref.fullPath,
          },
        });

      navigation.navigate("home");
    } catch (err) {
      console.error(err);
      Alert.alert("Cadastro", "Não foi possível cadastrar.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={() => navigation.goBack()} />

          <Title>Cadastrar</Title>

          {hasProduct ? (
            <TouchableOpacity onPress={handleDelete}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />
          {!hasProduct && (
            <PickImageButton type="secondary" onPress={handlePickerImage}>
              Carregar
            </PickImageButton>
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>
                {description.length} de 60 caracteres
              </MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              value={description}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size="P"
              value={priceSizeP}
              onChangeText={setPriceSizeP}
            />
            <InputPrice
              size="M"
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />
            <InputPrice
              size="G"
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </InputGroup>

          {!hasProduct && (
            <Button onPress={handleAdd} isLoading={isLoading}>
              Cadastrar pizza
            </Button>
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}
