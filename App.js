import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { theme } from "./src/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { Navigation } from "./src/components/navigation";
import "react-native-gesture-handler";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyAtLLQGFNYqWXWva7ul_MRChCVk9TnoVRI",
  authDomain: "moviestogo-dc60d.firebaseapp.com",
  projectId: "moviestogo-dc60d",
  storageBucket: "moviestogo-dc60d.appspot.com",
  messagingSenderId: "12950045677",
  appId: "1:12950045677:web:8e7dcd7d2c3275d6b55de4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

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
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
