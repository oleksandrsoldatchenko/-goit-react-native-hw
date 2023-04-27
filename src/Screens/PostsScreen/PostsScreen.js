import React from "react";
import { SafeAreaView, ScrollView, Dimensions, StyleSheet } from "react-native";
import Post from "../../Elements/Post";
import posts from "../../Source/posts";
import ProfileElement from "../../Elements/ProfileElement";

const windowWidth = Dimensions.get("window").width;
const avatar = require("../../Source/Rectangle22.png");
const postImg = require("../../Source/Rectangle23.png");

function PostsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: windowWidth }}
        contentContainerStyle={styles.scrollContainer}
      >
        <ProfileElement
          avatar={avatar}
          name="Natali Romanova"
          email="email@example.com"
        />
        {posts.map((el) => (
          <Post
            key={el.id}
            img={postImg}
            text={el.name}
            msgs={0}
            location={el.location}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    alignItems: "center",
  },
});

export default PostsScreen;
