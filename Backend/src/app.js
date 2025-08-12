const express = require("express");
const UserRoute = require("./routes/User.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// Allow only your frontend origin
app.use(
  cors({
    origin: ["https://looksy-omega.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/user", UserRoute);

module.exports = app;
