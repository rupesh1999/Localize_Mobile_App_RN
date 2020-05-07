import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

const adduser = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(data: { name: $name, email: $email, password: $password }) {
      name
      email
    }
  }
`;

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [addUser, { data, loading }] = useMutation(adduser);

  const signupHandeler = () => {
    addUser({
      variables: {
        name,
        email,
        password
      }
    })
      .then(() => navigation.navigate("Login"))
      .catch(e => console.log(e));
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
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
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
          <Button style={styles.btn} mode="contained" onPress={signupHandeler}>
            Sign Up
          </Button>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            Log In
          </Button>
          {data && <Text>{data.addUser.name}</Text>}
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
  conatiner: {},
  btn: {
    marginVertical: 10
  },
  input: {
    marginVertical: 10
  }
});

export default SignupScreen;
