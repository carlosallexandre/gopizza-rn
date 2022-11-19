import { ImageSourcePropType } from "react-native";
import { Image, Placeholder, PlaceholderTitle } from "./styles";

interface PhotoProps {
  uri?: string;
  placeholder?: string;
}

export function Photo({
  uri,
  placeholder = "Nenhuma foto carregada",
}: PhotoProps) {
  if (uri) {
    return <Image source={{ uri }} />;
  }

  return (
    <Placeholder>
      <PlaceholderTitle>{placeholder}</PlaceholderTitle>
    </Placeholder>
  );
}
