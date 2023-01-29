import React from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Assets/campusConnect.jpeg";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ClearFunc, logoutFunc } from "../../Redux/user/user.action";


const Navbar = () => {
  const { loginData } = useSelector((store) => store.User);
  const [useData, setUserData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  // --------------- (Log out) -------------------
  const handleLogout = () => {
    dispatch(logoutFunc());
    // ------------ Alert----------
    toast({
      title: "Log out Successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      dispatch(ClearFunc());
    }, 2);
    setUserData({});
  };

  return (
    <Box
      className={style.maindiv}
      pl={["2", "2", "10", "10"]}
      pr={["2", "2", "10", "10"]}
    >
      <Link to="/">
        <Image
          width={["30px", "30px", "65px", "65px"]}
          borderRadius={50}
          src={Logo}
          alt="Logo"
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
        {useData.role == "profile" ? (
          <Link to="/profile">
            <Button>profile</Button>
          </Link>
        ) : (
          ""
        )}

        {/* ---------- (Conditional rendering) ------------*/}
        {loginData ? (
          <>
            <Link to="/profile">
              <Button>Hi: {useData.name}</Button>
            </Link>
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
        {useData.role === "profile" ? (
          <Link to="/profile">
            <Text fontWeight={700}>
              <u>Profile</u>
            </Text>
          </Link>
        ) : (
          ""
        )}

        {/* ---------- (Conditional rendering) ------------*/}
        {loginData ? (
          <>
            <Link to="/profile">
              <Text fontWeight={700}>
                Hi: <span style={{ color: "red" }}>{useData.name}</span>
              </Text>
            </Link>
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
