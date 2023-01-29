import {
  loading,
  failed,
  login_success,
  signup_success,
  logout,
  clear
} from "./user.type";
import axios from "axios";

// ------------ (Sign up) ----------------
type signupData = {
  name:String,
  email:String,
  password:String
}

export const SignupApi = (form:signupData) => async (dispatch:Function) => {
  dispatch({ type: loading });
  try {
    const res = await axios.post(
      "https://campas-connected-hnhe.onrender.com/users/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
      }
    );
    dispatch({ type: signup_success, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (Log in) ----------------
type loginData = {
  email:String,
  password:String
}
export const LoginApi = (form:loginData) => async (dispatch:Function) => {
  dispatch({ type: loading });
  try {
    const res = await axios.post("https://kgs-backend.onrender.com/user/login", {
      email: form.email,
      password: form.password,
    });
    dispatch({ type: login_success, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (Log out) ----------------
export const logoutFunc = () => ({ type: logout });

// ------------ (Clear) ----------------
export const ClearFunc = () => ({ type: clear });
