import React, { useState } from "react";
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
const buttonImg = require("./add.png");

export default function RegistrationScreen ({ navigation }) {
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (text) => {
    setLogin(text);
  };
  const handleMail = (text) => {
    setMail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const register = () => {
    if (!login || !mail || !password) {
      alert("Enter all data please!");
      return;
    }
    navigation.navigate("Home", { screen: "PostsScreen" });
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
                <View style={styles.photoContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.5}
                  >
                    <ImageBackground
                      source={buttonImg}
                      style={{ width: "100%", height: "100%" }}
                    ></ImageBackground>
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Регистрация</Text>

                <TextInput
                  style={styles.inputField}
                  placeholder="Логин"
                  inputMode="text"
                  onFocus={() => setIsKeyboardVisible(true)}
                  value={login}
                  onChangeText={handleLogin}
                />
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
                  style={styles.registerButton}
                  activeOpacity={0.5}
                  onPress={register}
                >
                  <Text style={styles.registerButtonText}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginLink}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.loginLinkText}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

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
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
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
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
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