import React from "react";
import { View } from "react-native";
import {
    Text,
    Container,
    Button,
    Content,
    Form,
    Item,
    Input
} from "native-base";

const SignupScreen = ({ navigation }) => {
    return (
        <Container>
            <Container style={{marginHorizontal: 10}}>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" />
                        </Item>
                        <Button  style={{marginVertical: 10}} block>
                            <Text> Sign Up </Text>
                        </Button>
                        <Button block style={{marginVertical: 10}} onPress={() => navigation.navigate("Login")}>
                            <Text> Go to Login </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        </Container>
    );
};

export default SignupScreen;
