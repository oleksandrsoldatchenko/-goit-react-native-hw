import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

import { selectComments } from "../../Redux/comments/commentsSelectors";

const Comments = ({ route}) => {

  const { postId, postImg } = route.params;
  const allComments = useSelector(selectComments);
  const comments = allComments.filter(item => item.postId === postId);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postBody}>
        <Image
          source={{ uri: `${postImg}` }}
          style={{ width: 343, height: 240, borderRadius: 8, marginTop: 32 }}
        />
        <View style={styles.commentList}>
          <FlatList
            data={comments}
            keyExtractor={(indx) => indx.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-around",
                  marginBottom: 24,
                }}
              >
                {comments.indexOf(item) % 2 == 0 ? (
                  <>
                    <View style={{ borderRadius: "50%" }}>
                      <Image
                        source={{ uri: `${item.userPhoto}` }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </View>
                    <View style={styles.commentBody}>
                      <Text>{item.postText}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.commentBody}>
                      <Text>{item.postText}</Text>
                    </View>
                    <View style={{ borderRadius: "50%" }}>
                      <Image
                        source={{ uri: `${item.userPhoto}` }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  commentList: {
    marginTop: 30,
    width: "90%",
    flex: 1,
    justifyContent: "center",
  },
  commentStyle: {
    width: "70%",
    backgroundColor: "#ff0",
  },
  postHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 80,
    width: "100%",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  postHeaderText: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 20,
  },
  postBody: {
    width: "100%",
    alignItems: "center",
    flex: 10,
    borderTopColor: "#E8E8E8",
    borderRadius: 50,
    borderTopWidth: 1,
  },
  commentBody: {
    padding: 16,
    backgroundColor: "#00000008",
    width: "80%",
    borderRadius: "6px 0px 6px 6px",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
  },

  postImg: {
    flex: 3,
    width: "100%",
    height: 600,
    color: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  postImgAdd: {
    display: "flex",
    marginTop: -80,
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
    alignItems: "flex-start",
    color: "#fff",
  },
  postForm: {
    flex: 3,
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
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
});

export  default Comments;