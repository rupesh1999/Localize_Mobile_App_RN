import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";

import { AppRegistry } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://salty-thicket-40672.herokuapp.com/graphql'
});

const client = new ApolloClient({
  cache,
  link
});

const Stack = createStackNavigator();
export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(async () => {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            ...Ionicons.font
        });
        setIsReady(true);
    }, []);

    if (!isReady) {
        return <AppLoading />;
    }

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}
