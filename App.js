import React, { useCallback, useEffect, useState } from "react";
import {} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fontsLoaded = await Font.loadAsync({
          Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
        });

        await fontsLoaded;
      } catch (e) {
        console.log("fonts did not load", e.message);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  console.log("log check");

  return (
    <>
      {/* <LoginScreen /> */}
      <RegistrationScreen />
    </>
  );
}
