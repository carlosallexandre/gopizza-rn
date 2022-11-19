import { NavigationContainer } from "@react-navigation/native";

import { UserRoutes } from "./user.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <UserRoutes />
    </NavigationContainer>
  );
}
