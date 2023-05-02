import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { selectIsAuth } from "../../Redux/auth/authSelectors";
import { fetchLoginUser } from "../../Redux/auth/authOperations";

const backgroundImage = require("../../Source/Photo_BG.png");

const LoginScreen = ({ navigation }) => {
  const loggedIn = useSelector(selectIsAuth);

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("Home", { screen: "PostsScreen" });
    }
  }, [loggedIn]);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleMail = (text) => {
    setMail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const register = () => {
    if (!mail || !password) {
      alert("Enter all data please!!!");
      return;
    }
    dispatch(fetchLoginUser({ mail, password })).then((result) => {
      result.type === "auth/fetchLoginUser/fulfilled" &&
        navigation.navigate("Home", { screen: "PostsScreen" });
      result.type !== "auth/fetchLoginUser/fulfilled" &&
        alert("Incorrect login!!!");
    });
  };

  const passShow = () => alert(`Your password is: ${password}`);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Увійти</Text>

              <TextInput
                style={styles.textInput}
                placeholder="Електронна адреса"
                placeholderTextColor="#BDBDBD"
                inputMode="email"
                value={mail}
                onChangeText={handleMail}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={true}
                value={password}
                onChangeText={handlePassword}
              />

              <TouchableOpacity
                style={styles.showPasswordButton}
                activeOpacity={0.5}
                onPress={passShow}
              >
                <Text style={styles.showPasswordButtonText}>Показати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.5}
                onPress={() => {
                  register();
                }}
              >
                <Text style={styles.loginButtonText}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerLink}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Registration", {})}
              >
                <Text style={styles.registerLinkText}>
                  Ще не маєте акаунту? Зарееструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  keyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  textInput: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  showPasswordButtonText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showPasswordButton: {
    top: -34,
    left: 120,
  },
  loginButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  loginButtonText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  registerLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  registerLinkText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default LoginScreen;
