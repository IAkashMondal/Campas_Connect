const express= require("express");
const { registerUser, LoginUser, searchUsers } = require("../controller/user.controller");
const { authorization } = require("../middleware/auth.middleware");
const userRouter= express.Router();
userRouter.route("/").get(authorization, searchUsers);
userRouter.post("/register",registerUser);
userRouter.post("/login", LoginUser);
module.exports={
    userRouter
}