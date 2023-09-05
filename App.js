import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { TheatersScreen } from "./src/features/theater/screen/theater.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "./src/components/utility/safe-area.components";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { TheatersContextProvider } from "./src/services/theater/theater.context";
import { LocationContextProvider } from "./src/services/location/location.context";

const Tab = createBottomTabNavigator();

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocationContextProvider>
          <TheatersContextProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    if (route.name === "Theaters") {
                      return (
                        <MaterialIcons
                          name="theaters"
                          size={size}
                          color={color}
                        />
                      );
                    } else if (route.name === "Map") {
                      return (
                        <FontAwesome name="map" size={size} color={color} />
                      );
                    } else if (route.name === "Settings") {
                      return (
                        <Ionicons name="settings" size={size} color={color} />
                      );
                    }

                    // You can return any component that you like here!
                  },
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                })}
              >
                <Tab.Screen name="Theaters" component={TheatersScreen} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            </NavigationContainer>
          </TheatersContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
