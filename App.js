import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect,useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import "react-native-gesture-handler";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigator";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { firebase } from "./firebaseConfig";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      firebase.auth
        .signInWithEmailAndPassword(
          firebase.getAuth,
          "test@email.com",
          "test123"
        )
        .then((user) => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }, 2000);
  });

  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  let [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <FavouritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <AppNavigator />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavouritesContextProvider>
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
