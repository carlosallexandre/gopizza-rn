import { BottomMenu } from "@components/BottomMenu";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { Orders } from "@screens/Orders";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components/native";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        tabBarStyle: {
          height: 72,
          paddingBottom: getBottomSpace(),
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon({ color }) {
            return <BottomMenu color={color} title="Cardápio" />;
          },
        }}
      />

      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon({ color }) {
            return (
              <BottomMenu color={color} title="Pedidos" notifications={0} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
