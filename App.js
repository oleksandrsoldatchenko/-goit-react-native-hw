import { TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from './src/Screens/Navigation/Navigation';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import AuthCheck from "./src/Elements/AuthCheck";

export default function App() { 

  return (
  <Provider store = { store } >
    <>
    <AuthCheck>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavigationContainer>
         <Navigation/>
      </NavigationContainer>
     </TouchableWithoutFeedback>
     </AuthCheck>
     </>
   </Provider>
  );
};