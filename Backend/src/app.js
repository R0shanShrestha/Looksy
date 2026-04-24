const express = require("express");
const UserRoute = require("./routes/User.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// Allow only your frontend origin
app.use(
  cors({
    origin: [
      "http://192.168.1.69:8000",
      "http://localhost:8000",
      "https://looksy-8tlv.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/user", UserRoute);

module.exports = app;
