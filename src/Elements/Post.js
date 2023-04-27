import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const Post = ({ img, text, msgs, location }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={img}
        style={styles.imageBackground}
      ></ImageBackground>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Feather name="message-circle" size={20} color="gray" />
          <Text style={styles.msgs}>{msgs}</Text>
        </View>
        <View style={styles.info}>
          <EvilIcons name="location" size={24} color="gray" />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    justifyContent: "flex-start",
    paddingLeft: 28,
    paddingRight: 28,
  },
  imageBackground: {
    flex: 4,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  text: {
    textAlign: "left",
    marginTop: 8,
    fontWeight: "500",
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingTop: 11,
  },
  msgs: {
    paddingLeft: 9,
    color: "gray",
    fontSize: 16,
  },
  location: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Post;
