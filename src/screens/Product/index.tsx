import { useState } from "react";
import { Alert, Platform, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

import { Input } from "@components/Input";
import { Photo } from "@components/Photo";
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
import { Button } from "components/Button";

export function Product() {
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");

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
      const img_url = await ref.getDownloadURL();
      await ref.putFile(image);

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

      Alert.alert("Cadastro", "Pizza adicionada com sucesso.");
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
          <ButtonBack />

          <Title>Cadastrar</Title>

          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image} />
          <PickImageButton type="secondary" onPress={handlePickerImage}>
            Carregar
          </PickImageButton>
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

          <Button onPress={handleAdd} isLoading={isLoading}>
            Cadastrar pizza
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
}