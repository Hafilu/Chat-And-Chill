import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (selectedFile) => {
    // Rename the parameter to selectedFile
    if (!selectedFile) {
      // Check if a file was selected
      console.log("No image selected");
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", selectedFile); // Use selectedFile here
      data.append("upload_preset", "chat-and-chill");
      data.append("cloud_name", "dzt83ijsr");
      fetch("https://api.cloudinary.com/v1_1/dzt83ijsr/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    console.log("Profile Pic:", pic);
    setLoading(true);
    if (!name || !password || !email || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Password doesn't match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registeration successfull.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

       
      setLoading(false);
      history.push("/");
    } catch (error) {
      toast({
        title: "Error occured",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Type your name here..."
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Type your email here..."
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Type your password here..."
            onChange={(e) => setPassword(e.target.value)}
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
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Type your name here..."
            onChange={(e) => setConfirmPassword(e.target.value)}
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
      <FormControl id="pic" isRequired>
        <FormLabel>Profile Pic</FormLabel>
        <Input
          placeholder="Upload your picture here..."
          onChange={(e) => postDetails(e.target.files[0])}
          p={1.5}
          type="file"
          accept="image/*"
        />
      </FormControl>
      <Button
        colorScheme="pink"
        color={"pink.800"}
        width={"100%"}
        marginTop={"5"}
        isLoading={loading}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
