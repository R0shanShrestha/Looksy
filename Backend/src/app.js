const express = require("express");
const UserRoute = require("./routes/User.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// Allow only your frontend origin
app.use(
  cors({
    origin: [
      "https://looksy-omega.vercel.app",
      "https://looksy-8tlv.vercel.app",
      "http://localhost:8000",
      "http://192.168.1.69:8000",
    ],
    credentials: true,
  }),
);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/user", UserRoute);

module.exports = app;
