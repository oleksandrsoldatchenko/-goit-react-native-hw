import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../LoginScreen/LoginScreen";
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen";
import Home from "../Home/Home";
import PostsNav from "./PostsNav";
import CommentsNav from "./CommentsNavigator";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import ProfilePhotoScreen from "../ProfilePhotoScreen/ProfilePhotoScreen";

const MainStack = createStackNavigator();

const Navigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Registration" component={RegistrationScreen} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="PostsNav" component={PostsNav} />
      <MainStack.Screen name="CommentsNav" component={CommentsNav} />
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <MainStack.Screen
        name="ProfilePhotoScreen"
        component={ProfilePhotoScreen}
      />
    </MainStack.Navigator>
  );
};

export default Navigation;
