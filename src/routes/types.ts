type HomeParamList = undefined;
type ProductParamList = { id: string } | undefined;
type OrdersParamList = undefined;
type OrderDetailsParamList = { id: string } | undefined;

export type RootStackParamList = {
  home: HomeParamList;
  product: ProductParamList;
  order: OrderDetailsParamList;
  orders: OrdersParamList;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
