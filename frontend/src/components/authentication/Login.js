import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "./auth"; // Import loginSuccess function

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!password || !email) {
      toast({
        title: "Please fill all fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      // Call loginSuccess function with the token
      loginSuccess(data.token);

      toast({
        title: "Login successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // You can optionally store user data in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      window.location.reload();
      history.push("/chats");
    } catch (error) {
      console.log("error in login", error);
      toast({
        title: "Error occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"} color={"pink.900"}>
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Type your email here..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Type your password here..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={show ? "text" : "password"}
          />
          <InputRightElement width={"4"}>
            <Button
              height={"0em"}
              size={"sm"}
              onClick={handleClick}
              background={"gray.300"}
              marginRight={"190%"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="pink"
        color={"pink.800"}
        width={"100%"}
        marginTop={"5"}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="blue"
        color={"pink.800"}
        width={"100%"}
        marginTop={"3"}
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("12345678");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;
