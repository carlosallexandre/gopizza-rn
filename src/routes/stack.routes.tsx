import { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "@hooks/auth";

import { Signin } from "@screens/Signin";
import { Home } from "@screens/Home";
import { Product } from "@screens/Product";
import { Order } from "@screens/Order";

import { TabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { user } = useAuth();

  const isSignedIn = useMemo(() => !!user, [user]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="home"
            component={user?.isAdmin ? Home : TabRoutes}
          />
          <Stack.Screen name="product" component={Product} />
          <Stack.Screen name="order" component={Order} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="signin" component={Signin} />
      )}
    </Stack.Navigator>
  );
}
