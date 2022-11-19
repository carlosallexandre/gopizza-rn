import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  home: HomeParamList;
  product: ProductParamList;
  order: OrderParamList;
};

type HomeParamList = undefined;
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "home"
>;

type ProductParamList = { id: string } | undefined;
export type ProductScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "product"
>;

type OrderParamList = {} | undefined;
export type OrderScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "order"
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
