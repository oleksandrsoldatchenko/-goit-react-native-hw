import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import ImageBackgroundComponent from "./BackgroundImage";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  const [dimensions] = useState(
    Dimensions.get("window").width - 0 * 2
  );

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackgroundComponent>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -240 : 0,
                  width: dimensions,
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Войти</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Адрес электронной почты"
                    placeholderTextColor="#BDBDBD"
                    textAlign={"left"}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.email}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    textAlign={"left"}
                    secureTextEntry={!passwordVisible}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.password}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.showHidePasswordButton}
                    onPress={togglePasswordVisibility}
                  >
                    <Text style={styles.showHidePasswordButtonText}>
                      {passwordVisible ? "Скрыть" : "Показать"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={keyboardHide}
                >
                  <Text style={styles.btnTitle}>Войти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
        </ImageBackgroundComponent>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    paddingLeft: 16,
    fontSize: 16,
  },
  form: {
    backgroundColor: "#fff",
    height: 489,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 40,
  },
  btnTitle: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 30,
    marginTop: 16,
    color: "#212121",
  },
  registrLink: {
    fontSize: 16,
    color: "#1B4371",
    marginTop: 16,
  },
  showHidePasswordButtonText: {
    position: "absolute",
    right: 0,
    top: -35,
    paddingRight: 10,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
