const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../configs/token.genarate");
// Register User---------------------------------------------------------------------------->

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, pic } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.send({ email: "Email already exists" });
    } else {
      try {
        bcrypt.hash(password, 6, async (err, new_hash_pass) => {
          if (err) {
            console.log(err);
          } else {
            const user = new UserModel({
              email,
              password: new_hash_pass,
              name,
              pic,
            });
            await user.save();

            res.send({ massege: `User register` });
          }
        });
      } catch (err) {
        console.log({ massge: "register link not working", err });
        res.send(err);
      }
    }
  });
});

// Login User---------------------------------------------------------------------------->
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { Userid: user[0]._id },
            process.env.JWT_SECRET
          );
          console.log(user, "login user deatils");
          res.send({ massege: "User login", token: token });
        } else {
          res.send({ massege: "wrong credentials1" });
        }
      });
    } else {
      res.send({ massege: "wrong credentials2" });
    }
  } catch (err) {
    console.log({ massege: "login faild", err });
    res.send(err);
  }
});

// searchUser---------------------------------------------------------------------------->
const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword)
  res.send(users);
});

module.exports = {
  registerUser,
  LoginUser,
  searchUsers,
};
