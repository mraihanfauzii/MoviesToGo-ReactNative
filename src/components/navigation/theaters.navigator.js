import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { TheatersScreen } from "../../features/theater/screen/theater.screen";
import { TheaterDetailScreen } from "../../features/theater/screen/theater-detail.screen";

const TheaterStack = createStackNavigator();
export const TheatersNavigator = () => {
  return (
    <TheaterStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS.IOS }}
    >
      <TheaterStack.Screen name="Theaters" component={TheatersScreen} />
      <TheaterStack.Screen
        name="TheaterDetail"
        component={TheaterDetailScreen}
      />
    </TheaterStack.Navigator>
  );
};
