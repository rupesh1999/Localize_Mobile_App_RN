import React from "react";
import {
    Text,
    Container,
    Button,
    Content,
    Form,
    Item,
    Input
} from "native-base";

const LoginScreen = ({navigation}) => {
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
                            <Text> Login </Text>
                        </Button>
                        <Button block style={{marginVertical: 10}} onPress={() => navigation.navigate("Signup")}>
                            <Text> Go to Sign Up </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        </Container>
    );
};

export default LoginScreen;
