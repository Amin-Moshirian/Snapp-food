import * as dotenv from "dotenv";
import express from "express"
import router from "./router/router"
import mongoose from "mongoose";
import path from "path";
const app: express.Express = express();
dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/Snapp-food')
  .then((): void => console.log("Connected to DB!"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.listen("5000", (): void => console.log("Server run on port 5000"));
