const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { chats } = require("./data/data");
const { connection } = require("./configs/db");
const { userRouter } = require("./Routes/user.routes");
const { ChatRouter } = require("./Routes/chats.routes");
const { MessagerRouter } = require("./Routes/message.routes");


const app = express();
app.use(cors());
app.use(express.json());

// home routing-------------------------------------------------------------------------------->

app.get("/", (req, res) => {
  res.send("api running");
  console.log("connected");
});
app.use("/user",userRouter)
app.use("/chats", ChatRouter);
app.use("/message", MessagerRouter);

const server = app.listen(process.env.PORT||5400, async () => {
  try {
    await connection;
    console.log("Connected to Db");
  } catch (err) {
    console.log(
      `SOMETING WENT WRONG WHILE LISTENING AT PORT ${process.env.port}`
    );
  }
  console.log(`lissten on ${process.env.port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors:{
    origin:"*"
  }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
