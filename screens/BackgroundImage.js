import React from "react";
import { ImageBackground } from "react-native";

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      source={require("../assets/images/bgimage.jpg")}
    >
      {children}
    </ImageBackground>
  );
}
