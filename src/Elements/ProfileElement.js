import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const ProfileElement = ({ avatar, name, email }) => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 18,
    marginTop: 32,
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 15,
    width: 60,
    height: 60,
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#777",
  },
});

export default ProfileElement;