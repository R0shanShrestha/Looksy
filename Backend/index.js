const http = require("http");
const app = require("./src/app");
const dbConnectionState = require("./src/database/db");
const { PORT } = require("./src/config/config");

const server = http.createServer(app);

dbConnectionState().then((res) => {
  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }

    console.log("Database Connected !");
    console.log("Server Running on port: ", PORT);
  });
});
