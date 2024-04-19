import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./Routes/booksRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import customerRoutes from "./Routes/customerRoutes.js";
import inventoryRoutes from "./Routes/inventoryRoutes.js";
import cors from "cors";
const app = express();

//Middleware for parsing JSON
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http:localhost:3000/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders:['Content-Type']
//   })
// );

app.use("/books", booksRoute);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/inventory", inventoryRoutes);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
