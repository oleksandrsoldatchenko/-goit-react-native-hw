import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const BottomTabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <SimpleLineIcons name="grid" size={24} color="#212121" />;
          },
          headerTitleAlign: "center",
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Публикации"
        component={PostsScreen}
      />

      <BottomTabs.Screen
        options={{
          tabBarIcon: () => {
            return (
              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("CreatePostsScreen")}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            );
          },
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />

      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <AntDesign name="user" size={24} color="#212121" />;
          },
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 16,
  },
  addButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default Home;
