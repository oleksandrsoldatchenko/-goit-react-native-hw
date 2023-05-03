import React, { useState } from "react";
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
  Image
} from "react-native";
import { useDispatch } from "react-redux";

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

import { fetchRegisterUser } from "../../Redux/auth/authOperations";

const backgroundImage = require('../../Source/Photo_BG.png');

const RegistrationScreen = ({ navigation, route }) => {

const { photo } = route.params;
const dispatch = useDispatch();

const [login, setLogin] = useState('');
const [mail, setMail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = (text) => setLogin(text);
const handleMail = (text) => setMail(text);
const handlePassword = (text) => setPassword(text);

const register = () => {
  if (!login || !mail || !password) {
    alert("Enter all data please!!!");
    return;
  }
  dispatch(fetchRegisterUser({ mail, password, login, photo }))
  .then(result => {
    if (result.type === 'auth/fetchRegisterUser/fulfilled') {
      navigation.navigate('Home', { screen: 'PostsScreen' });
    } else {
      alert('Incorrect registration!!!');
    }
  });
}

const takePhoto = () => navigation.navigate('ProfilePhotoScreen');

const showPassword = () => alert(`Your password is: ${password}`);

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
            <View style={styles.innerContainer}>
              <View style={styles.photoContainer}>
                {photo && (
                  <Image
                    source={{ uri: `${photo}` }}
                    style={styles.profilePhoto}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.5}
                onPress={takePhoto}
              >
                <AntDesign name="pluscircleo" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.inputLogin}
                placeholder="Імя"
                inputMode="text"
                value={login}
                onChangeText={handleLogin}
              />
              <TextInput
                style={styles.inputMailPass}
                placeholder="Електронна адреса"
                inputMode="email"
                value={mail}
                onChangeText={handleMail}
              />
              <TextInput
                style={styles.inputMailPass}
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                onChangeText={handlePassword}
              />
              <TouchableOpacity
                style={styles.passwordShowButton}
                activeOpacity={0.5}
                onPress={showPassword}
              >
                <Text style={styles.passwordShowText}>Показати</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.5}
                onPress={register}
              >
                <Text style={styles.registerButtonText}>Зарееструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginLink}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginLinkText}>
                  Вже є аккаунт? Увійти
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
  profilePhoto: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignSelf: "center",
  },
  innerContainer: {
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
    position: "relative",
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
  },
  addButton: {
    position: "absolute",
    left: "62%",
    top: 10,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  inputMailPass: {
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
  passwordShowText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwordShowButton: {
    top: -34,
    left: 120,
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
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;