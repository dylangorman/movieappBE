require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");

const connection = require("./connection");
const { User, Movie } = require("./models/user");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");

const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");

const app = express();

app.use(express.json());
//app.use(passport.initialize());

//http://localhost/user/registeruser
// {
//   "name": "dylan",
//   "password": "somestringoranother"
// }
//http://localhost/user/getallusers - send request (req)

//cors provides a way for backend and front ent to run from the same port and therefore
//be single-origin (npm install cors)
app.use(cors());

app.use("/user", userRouter);
// app.use("/login", userRouter);
app.use("/movie", movieRouter);
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);
// passport.authenticate("name", callback);

app.listen(process.env.PORT, () => {
  connection.authenticate();
  User.sync({ alter: true });
  Movie.sync({ alter: true });
  console.log("App is online");
});
