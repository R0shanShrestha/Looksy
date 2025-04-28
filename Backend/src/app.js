const express = require("express");
const UserRoute = require("./routes/User.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/user", UserRoute);

module.exports = app;
