import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { MoviesScreen } from "../../features/movie/screen/movie.screen";
import { MovieDetailScreen } from "../../features/movie/screen/movie-detail.screen";

const MovieStack = createStackNavigator();

export const MoviesNavigator = () => {
  return (
    <MovieStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      })}
    >
      <MovieStack.Screen name="Movies" component={MoviesScreen} />
      <MovieStack.Screen name="MovieDetail" component={MovieDetailScreen} />
    </MovieStack.Navigator>
  );
};
