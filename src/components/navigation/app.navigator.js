import React from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TheatersNavigator } from "./theaters.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { TheatersContextProvider } from "../../services/theater/theater.context";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ size, color }) => {
      if (route.name === "Theaters") {
        return <MaterialIcons name="theaters" size={size} color={color} />;
      } else if (route.name === "Map") {
        return <FontAwesome name="map" size={size} color={color} />;
      } else if (route.name === "Settings") {
        return <Ionicons name="settings" size={size} color={color} />;
      }
    },
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <TheatersContextProvider>
        <Tab.Navigator
          screenOptions={createScreenOptions}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Theaters" component={TheatersNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
      </TheatersContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
