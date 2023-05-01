import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const backgroundImage = require("../../Source/Photo_BG.png");

import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, selectUser } from "../../Redux/auth/authSelectors";
import {
  fetchLoginUser,
  fetchCurrentUser,
} from "../../Redux/auth/authOperations";
import { fetchGetAllPosts } from "../../Redux/posts/postsOperations";

export default function LoginScreen({ navigation }) {
  const logedIn = useSelector(selectIsAuth);

  if (logedIn) {
    navigation.navigate("Home", { screen: "PostsScreen" });
  }

  //state
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  //redux
  const dispatch = useDispatch();

  const handleMail = (text) => {
    setMail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const register = () => {
    if (!mail || !password) {
      alert("Enter all data pleace!!!");
      return;
    }
    dispatch(fetchLoginUser({ mail, password })).then((result) => {
      result.type === "auth/fetchLoginUser/fulfilled" &&
        navigation.navigate("Home", { screen: "PostsScreen" });
      result.type !== "auth/fetchLoginUser/fulfilled" &&
        alert("Incorrect login!!!");
    });
  };

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [dimensions] = useState(Dimensions.get("window").width - 0 * 2);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const hideKeyboard = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={backgroundImage} style={styles.background}>
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View
              style={{
                marginBottom: isKeyboardVisible ? -170 : 0,
                width: dimensions,
              }}
            >
              <View style={styles.formContainer}>
                <Text style={styles.title}>Войти</Text>

                <TextInput
                  style={styles.inputField}
                  placeholder="Адрес электронной почты"
                  inputMode="email"
                  value={mail}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onChangeText={handleMail}
                  autoCapitalize="none"
                />

                <TextInput
                  style={styles.inputField}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={!isPasswordVisible}
                  onFocus={() => setIsKeyboardVisible(true)}
                  value={password}
                  onChangeText={handlePassword}
                />

                <TouchableOpacity
                  style={styles.showHidePasswordButton}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={styles.showHidePasswordButtonText}>
                    {isPasswordVisible ? "Скрыть" : "Показать"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  activeOpacity={0.5}
                  onPress={register}
                >
                  <Text style={styles.loginButtonText}>Войти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.signupLink}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.signupLinkText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  keyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputField: {
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
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
  signupLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  signupLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showHidePasswordButtonText: {
    position: "absolute",
    right: -170,
    top: -35,
    paddingRight: 10,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
