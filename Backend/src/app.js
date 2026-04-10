const express = require("express");
const UserRoute = require("./routes/User.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ✅ CORS (ONLY ONCE)
const allowedOrigins = [
  "https://looksy-omega.vercel.app",
  "http://localhost:5173",
  "http://192.168.1.67:8000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/user", UserRoute);

module.exports = app;