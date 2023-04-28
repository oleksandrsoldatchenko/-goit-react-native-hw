import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

const CreatePost = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photoi, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [inputRegion, setInputRegion] = useState("");
  const [title, setTitle] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert(
          "Ошибка",
          "Отсутствуют разрешения на использование камеры."
        );
        return;
      }

      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert(
          "Ошибка",
          "Отсутствуют разрешения на использование местоположения."
        );
        return;
      }

      try {
        const locationPos = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = locationPos.coords;
        const coords = { latitude, longitude };
        setLocation(coords);

        const regionName = await Location.reverseGeocodeAsync(coords);
        setRegion(regionName);
      } catch (error) {
        Alert.alert("Ошибка", "Не удалось получить местоположение.");
      }

      setIsCameraReady(true);
    })();
  }, []);

  const active = title && region;

  const takePhoto = async () => {
    if (!isCameraReady) {
      console.log("Camera is not ready yet. Wait for onCameraReady callback.");
      return;
    }
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setInputRegion(region[0]?.country + ", " + region[0]?.city);
  };

  const inputTitle = (text) => {
    setTitle(text);
  };

  const handleCreate = () => {
    if (!title || !location || !photoi) {
      alert("Enter all data please!!!");
      return;
    }
    navigation.navigate("PostList", { photoi, location, inputRegion, title });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={120}
    >
      <ScrollView contentContainerStyle={styles.postContainer}>
        <View style={styles.postContainer}>
          {isCameraReady ? (
            <Camera style={styles.postImg} ref={setCamera}>
              <Image
                source={{ uri: photoi }}
                style={{ height: 220, width: 220, marginTop: -80 }}
              />
            </Camera>
          ) : (
            <View style={styles.postImgPlaceholder} />
          )}

          <TouchableOpacity
            style={styles.postImgAdd}
            activeOpacity={0.7}
            onPress={takePhoto}
          >
            <FontAwesome name="camera" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.postImgText}>Загрузите фото</Text>
          <View style={styles.postForm}>
            <TextInput
              style={styles.postName}
              placeholder="Название..."
              inputMode="text"
              onChangeText={inputTitle}
            />
            <TextInput
              style={styles.postName}
              placeholder="Местность..."
              inputMode="text"
              value={inputRegion}
            />

            <TouchableOpacity
              style={active ? styles.postButtonActive : styles.postButton}
              activeOpacity={0.5}
              onPress={handleCreate}
            >
              <Text style={styles.postButtonText}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  postImg: {
    flex: 3,
    marginTop: 32,
    marginLeft: 16,
    marginRight: 16,
    color: "#F6F6F6",
    height: 240,
  },
  postImgAdd: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -150,
    marginLeft: -25,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
    borderColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  postImgText: {
    marginLeft: 16,
    marginTop: 8,
    fontSize: 16,
    color: "#BDBDBD",
  },
  postForm: {
    flex: 3,
    marginLeft: 16,
    marginRight: 16,
  },
  postButton: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  postName: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
  postContainer: {},
});

export default CreatePost;
