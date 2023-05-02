import React from "react";
import { useSelector } from "react-redux";
import { Text, FlatList, View, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Feather, EvilIcons } from '@expo/vector-icons';

import ProfileElement from "../../Elements/ProfileElement";

import { selectAllPosts } from "../../Redux/posts/postsSelectors";
import { selectComments } from "../../Redux/comments/commentsSelectors";

const PostList = ({navigation}) => {

  const posts = useSelector(selectAllPosts);
  const allComments = useSelector(selectComments);

  const getCommentsCount = (id) => {
    const comCount = allComments.filter(item=> item.postId === id).length;
    return comCount;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ProfileElement />
        <FlatList
          data={posts}
          keyExtractor={(indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${item.photo}` }}
                style={{ width: 343, height: 240, borderRadius: 8 }}
              />
              <Text style={styles.posText}>{item.title}</Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "95%",
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
                  <Feather name="message-circle" size={18} color="#BDBDBD" />
                  <Text style={styles.getCommentsCount}>
                    {getCommentsCount(item.id)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.infoLink}>{item.inputRegion}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </>
  );
  };

const styles = StyleSheet.create({
  posText: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 8,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
  },
  getCommentsCount: {
    color: "#BDBDBD",
    marginLeft: 9,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
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
  },
});

export default PostList;