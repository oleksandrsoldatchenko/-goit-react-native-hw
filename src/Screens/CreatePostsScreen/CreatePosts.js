import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPhoto } from "../../Redux/storage/storageOperations";
import { fetchAddPost } from "../../Redux/posts/postsOperations";
import { selectUserId } from "../../Redux/auth/authSelectors";

const CreatePost = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photoi, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [inputRegion, setInputRegion] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const uid = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      Location.getCurrentPositionAsync({})
        .then((locationPos) => {
          const coords = {
            latitude: locationPos.coords.latitude,
            longitude: locationPos.coords.longitude,
          };
          setLocation(coords);
          return coords;
        })
        .then((coords) => {
          return Location.reverseGeocodeAsync(coords);
        })
        .then((regionName) => setRegion(regionName))
        .catch();
    })();
  }, []);

  const active = title && region;

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setInputRegion(region[0]["country"] + ", " + region[0]["city"]);
  };

  const inputTitlte = (text) => {
    setTitle(text);
  };

  const hendleCreate = async () => {
    if (!title || !location || !photoi) {
      alert("Enter all data pleace!!!");
      return;
    }
    const { payload } = await dispatch(fetchUploadPhoto(photoi));
    await dispatch(
      fetchAddPost({ photo: payload, title, inputRegion, location, uid })
    );
    navigation.navigate("PostList");
  };

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <Camera style={styles.cameraContainer} ref={setCamera}>
          <Image source={{ uri: photoi }} style={{ height: 240, width: 343 }} />
          <TouchableOpacity
            style={styles.cameraIcon}
            activeOpacity={0.5}
            onPress={takePhoto}
          >
            <FontAwesome name="camera" size={24} color="white" />
          </TouchableOpacity>
        </Camera>

        <View style={styles.postForm}>
          <Text style={styles.postImgText}>Додати фото</Text>
          <TextInput
            style={styles.postName}
            placeholder="Назва..."
            inputMode="text"
            onChangeText={inputTitlte}
          />
          <TextInput
            style={styles.postName}
            placeholder="Розташування..."
            inputMode="navigation"
            value={inputRegion}
          />
          <TouchableOpacity
            style={active ? styles.postButtonActive : styles.postButton}
            activeOpacity={0.5}
            onPress={hendleCreate}
          >
            <Text
              style={
                active ? styles.postButtonTextActive : styles.postButtonText
              }
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cameraContainer: {
    marginTop: 32,
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  cameraIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  postImgText: {
    color: "#fff",
    marginTop: 8,
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  postForm: {
    flex: 3,
  },
  postButton: {
    backgroundColor: "#F6F6F6",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 32,
    marginBottom: 32,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 32,
    marginBottom: 32,
  },
  postButtonText: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  postButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  postName: {
    height: 50,
    marginTop: 32,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
});

export default CreatePost;
