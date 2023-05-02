import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

import { Feather, EvilIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { selectAuthPosts } from "../../Redux/posts/postsSelectors";
import { selectUser } from "../../Redux/auth/authSelectors";
import { selectComments } from "../../Redux/comments/commentsSelectors";

const backImage = require("../../Source/Photo_BG.png");
const buttonImg = require("../RegistrationScreen/add.png");

function ProfileScreen({ navigation }) {
  const allComments = useSelector(selectComments);

  const getCommentsCount = (id) => {
    const comCount = allComments.filter((item) => item.postId === id).length;
    return comCount;
  };

  const posts = useSelector(selectAuthPosts);
  const { name, photo } = useSelector(selectUser);

  return (
    <SafeAreaView>
      <ImageBackground source={backImage} style={styles.backImg}>
        <ScrollView bounces={false}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.container}>
              <View style={styles.photoContainer}>
                <Image
                  source={{ uri: `${photo}` }}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                ></Image>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
                  <ImageBackground
                    source={buttonImg}
                    style={{ width: "100%", height: "100%" }}
                  ></ImageBackground>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("Home", { screen: "PostsScreen" })
                }
              >
                <Feather name="log-out" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.title}>{name}</Text>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <FlatList
                  data={posts}
                  keyExtractor={(indx) => indx.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: `${item.photo}` }}
                        style={{
                          width: 343,
                          height: 240,
                          borderRadius: 8,
                          backgroundColor: "#F6F6F6",
                        }}
                      />
                      <Text style={styles.posText}>{item.title}</Text>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "95%",
                          marginBottom: 34,
                        }}
                      >
                        <TouchableOpacity
                          style={styles.info}
                          onPress={() =>
                            navigation.navigate("CommentsNav", {
                              postId: item.id,
                              postImg: item.photo,
                            })
                          }
                        >
                          <Feather
                            name="message-circle"
                            size={20}
                            color="#BDBDBD"
                          />
                          <Text style={styles.getCommentsCount}>
                            {getCommentsCount(item.id)}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.info}
                          onPress={() =>
                            navigation.navigate("Map", {
                              location: item.location,
                            })
                          }
                        >
                          <EvilIcons
                            name="location"
                            size={24}
                            color="#BDBDBD"
                          />
                          <Text style={styles.infoLink}>
                            {item.inputRegion}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                ></FlatList>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginLeft: 320,
    marginTop: -40,
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 119,
  },
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "visible",
  },
  addButton: {
    marginTop: -40,
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 33,
    lineHeight: 35,
  },
  posText: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 8,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  getCommentsCount: {
    color: "#BDBDBD",
    marginLeft: 9,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
    marginLeft: 6,
  },
  infoLink: {
    textDecorationLine: "underline",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
});

export default ProfileScreen;
