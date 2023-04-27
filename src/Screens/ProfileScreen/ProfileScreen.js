import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import postsData from "../../Source/posts";
import Post from "../../Elements/Post";

const backgroundImg = require("../../Source/Photo_BG.png");
const removeImg = require("../RegistrationScreen/remove.png");
const profileImg = require("../../Source/Rectangle22.png");
const postImg = require("../../Source/Rectangle23.png");

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={backgroundImg} style={styles.background}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.profilePhotoContainer}>
                <ImageBackground
                  source={profileImg}
                  style={styles.profilePhoto}
                >
                  <TouchableOpacity
                    style={styles.removeButton}
                    activeOpacity={0.5}
                  >
                    <Image source={removeImg} style={styles.removeButtonImg} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() =>
                  navigation.navigate("Home", { screen: "PostsScreen" })
                }
              >
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <Text style={styles.title}>Natali Romanova</Text>
              {postsData.map((post) => (
                <Post
                  key={post.id}
                  img={postImg}
                  text={post.name}
                  msgs={0}
                  location={post.location}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 147,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profilePhotoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  removeButton: {
    marginTop: -25,
    marginRight: -10,
    height: 38,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonImg: {
    width: "100%",
    height: "100%",
  },
  logoutButton: {
    position: "absolute",
    top: 48,
    right: 16,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 33,
    lineHeight: 35,
  },
});
