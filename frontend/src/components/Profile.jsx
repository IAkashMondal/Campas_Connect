import { Box, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonImg from "../Images/person.png";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const { loginData } = useSelector((store) => store.User);
  console.log("loginData: ", loginData);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  return (
    <Box m="auto" mt={100}>
      <Heading>Profile Details</Heading>
      <Box w="400px" margin={"auto"} textAlign="left" p="4" bg="#dcc7a2" borderRadius={20}>
        <Image borderRadius={20} src={PersonImg} alt="PersonImg" />
        <Text fontSize={25} fontWeight={500}>
          <b>Name:</b> {userData.name}
        </Text>
        <Text  fontSize={20} fontWeight={500}>
          <b>Email:</b> {userData.email}
        </Text>
        <Text fontWeight={500} textTransform={"capitalize"}>
          <b>Role:</b> {userData.role}
        </Text>
      </Box>
    </Box>
  );
};

export default Profile;
