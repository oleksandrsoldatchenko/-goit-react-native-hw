import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import store from "./src/Redux/store";

import AuthChack from "./src/Elements/AuthChack";
import LoadingScreen from "./src/Elements/Loading";
import Navigation from "./src/Screens/Navigation/Navigation";


export default function App() {
  return (
    <Provider store = { store } >
      <>
      <LoadingScreen/>
      <AuthChack>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </TouchableWithoutFeedback>
      </AuthChack>
     </>
   </Provider>
  );
}
