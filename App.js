import React , {useState , useEffect} from "react";
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";


const Stack = createStackNavigator();
export default function App() {
    const [isReady , setIsReady] = useState(false);
 
    useEffect( async() => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true);
    } , []);

    if (!isReady) {
      return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
