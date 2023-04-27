import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { EvilIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BottomTabs = createBottomTabNavigator();

const CreatePostScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.addImageButton} activeOpacity={0.5}>
          <FontAwesome style={styles.cameraIcon} name="camera" size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.uploadImageText}>Загрузите фото</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Название..."
          inputMode="text"
        />
        <TextInput
          style={styles.input}
          placeholder="Местность..."
          inputMode="navigation"
        />
        <TouchableOpacity style={styles.publishButton} activeOpacity={0.5}>
          <Text style={styles.publishButtonText}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CreatePostsScreen = ({ navigation }) => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          borderBottomColor: "#E8E8E8",
          borderBottomWidth: 2,
        },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => {
            return (
              <TouchableOpacity style={styles.trashButton} activeOpacity={0.5}>
                <EvilIcons name="trash" size={35} color="#DADADA" />
              </TouchableOpacity>
            );
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Home", { screen: "PostsScreen" })
              }
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: "center",
          headerTitleStyle: { paddingBottom: 5 },
        }}
        name="Создать публикацию"
        component={CreatePostScreen}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 2,
    width: "100%",
    borderRadius: 8,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  addImageButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
  },
  cameraIcon: {
    display: "flex",
    color: "grey",
    backgroundColor: "#fff",
  },
  uploadImageText: {
    marginTop: 8,
    marginBottom: 16,
    color: "#BDBDBD",
    fontSize: 16,
  },
  formContainer: {
    flex: 3,
  },
  publishButton: {
    backgroundColor: "#F6F6F6",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 17,
  },
  publishButtonText: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
  },
  input: {
    marginTop: 32,
    paddingBottom: 15,
    marginBottom: 15,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  trashButton: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
