const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv/config");
const routes = require("./src/routes/index.js");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect("mongodb://127.0.0.1:27017/hostel-m")
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
