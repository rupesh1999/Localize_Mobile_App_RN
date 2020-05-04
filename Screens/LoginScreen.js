import React, { useState } from "react";
import {
    Text,
    Container,
    Button,
    Content,
    Form,
    Item,
    Input
} from "native-base";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

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

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("abc@gmail.com");
    const [password, setPassword] = useState("");

    const [login, { data, loading , error }] = useMutation(Login);

    const loginHandeler = () => {
        login({
            variables: {
                email,
                password
            }
        });
    };

    if (loading) {
        return <Text>Loading+</Text>;
    }

    if (error) {
        return <Text>error+</Text>;
    }

    return (
        <Container>
            <Container style={{ marginHorizontal: 10 }}>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                onChangeText={text => setEmail(text)}
                                placeholder="Username"
                            />
                        </Item>
                        <Item last>
                            <Input
                                onChangeText={text => setPassword(text)}
                                placeholder="Username"
                                placeholder="Password"
                            />
                        </Item>
                        <Button
                            onPress={() => loginHandeler}
                            style={{ marginVertical: 10 }}
                            block
                        >
                            <Text> Login </Text>
                        </Button>
                        <Button
                            block
                            style={{ marginVertical: 10 }}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text> Go to Sign Up </Text>
                        </Button>
                        <Text>{data && data.login.user.name}</Text>
                    </Form>
                </Content>
            </Container>
        </Container>
    );
};

export default LoginScreen;
