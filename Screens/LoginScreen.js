import React, { useState } from "react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AsyncStorage } from 'react-native';


const Login = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        name
        email
      }
    }
  }
`;

const LoginScreen = ({ navigation , route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading }] = useMutation(Login);

  const loginHandeler = () => {
    login({
      variables: {
        email,
        password
      }
    }).then( async() => {
        try {
            await AsyncStorage.setItem('token', data.login.token);
            console.log(route);
            route.params.SetLoggedIn();
            navigation.navigate("FirstTimeScreen");
          } catch (error) {
            console.log(error.message);
          }
    }).catch(e => console.log(e));
  };

  if (loading) {
    return <Text>Loading+</Text>;
  }

  return (
    <>
      <View style={styles.root}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button style={styles.btn} mode="contained" onPress={loginHandeler}>
            Login
          </Button>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20
  },
  conatiner: {

  },
  btn: {
    marginVertical: 10
  },
  input:{
      marginVertical: 10, 
  }
});

export default LoginScreen;
