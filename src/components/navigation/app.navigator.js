import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "../utility/safe-area.components";
import { TheatersNavigator } from "./theaters.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

const Tab = createBottomTabNavigator();

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Theaters") {
            return <MaterialIcons name="theaters" size={size} color={color} />;
          } else if (route.name === "Map") {
            return <FontAwesome name="map" size={size} color={color} />;
          } else if (route.name === "Settings") {
            return <Ionicons name="settings" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Theaters" component={TheatersNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </NavigationContainer>
);
