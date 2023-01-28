import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import Logo from './App Logo.png'

import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";


const Navbar = () => {
  const [userData, setUserData] = useState({name:"Abhishek", role:"user"});
  const [loginData, setLoginData] = useState({name:"Abhishek"})
  const toast = useToast();


  // --------------- (Log out) -------------------
  const handleLogout = () => {
    // ------------ Alert----------
    toast({
      title: "Log out Successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setUserData(Object);
  };

  return (
    <Box
      className={style.maindiv}
      pl={["2", "2", "10", "10"]}
      pr={["2", "2", "10", "10"]}
    >
      <Link to="/">
        <Image
          width={["30px", "30px", "70px", "70px"]}
          borderRadius={50}
          src={Logo}
          alt="logo"
        />
      </Link>
      <SimpleGrid
        className={style.options}
        columns={4}
        gap={10}
        display={["none", "none", "flex", "flex"]}
      >
        <Link to="/">
          <Button>Chat</Button>
        </Link>
        {userData.role === "admin" ? (
          <Link to="/admin">
            <Button>Admin</Button>
          </Link>
        ) : (
          ""
        )}

        {/* ---------- (Conditional rendering) ------------*/}
        {loginData ? (
          <>
            <Button>Hi: {userData.name}</Button>
            <Button onClick={handleLogout}>Log out</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button>Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </SimpleGrid>

      <Box gap={3} display={["flex", "flex", "none", "none"]}>
        <Link to="/">
          <Text fontWeight={700}>
            <u>Chat</u>
          </Text>
        </Link>
        {userData.role == "admin" ? (
          <Link to="/admin">
            <Text fontWeight={700}>
              <u>Admin</u>
            </Text>
          </Link>
        ) : (
          ""
        )}

        {/* ---------- (Conditional rendering) ------------*/}
        {loginData ? (
          <>
            <Text fontWeight={700}>
              Hi: <span style={{ color: "red" }}>{userData.name}</span>
            </Text>
            <Text
              fontWeight={700}
              onClick={handleLogout}
              cursor="pointer"
              bg="#dc3544"
              borderRadius={20}
              color="#ffff"
              pl="1"
              pr="1"
            >
              Log out
            </Text>
          </>
        ) : (
          <>
            <Link to="/login">
              <Text bg="#dc3544" borderRadius={20} color="#ffff" pl="1" pr="1">
                Log in
              </Text>
            </Link>
            <Link to="/signup">
              <Text fontWeight={700}>Sign up</Text>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;