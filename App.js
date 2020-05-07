import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import FirstTimeScreen from "./Screens/FirstTimeScreen";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { AppRegistry } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://salty-thicket-40672.herokuapp.com/"
});

const client = new ApolloClient({
  cache,
  link
});

const Stack = createStackNavigator();
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const SetLoginHandler = () => {
      setIsLoggedIn(true);
  }
  useEffect(
    () => async () => {
      await Font.loadAsync({
        Roboto: require("./Fonts/Roboto-Regular.ttf"),
        Roboto_medium: require("./Fonts/Roboto-Medium.ttf"),
        ...Ionicons.font
      });
      setIsReady(true);
    },
    []
  );

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {!isLoggedIn ? (
              <>
                <Stack.Screen initialParams={{SetLoggedIn : SetLoginHandler, temp: 20}} name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            ) : (
              <Stack.Screen
                name="FirstTimeScreen"
                component={FirstTimeScreen}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", App);
