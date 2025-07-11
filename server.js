import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/config/dbconfig.js";
import authRoute from "./src/routes/authRoute.js";
import usersRoute from "./src/routes/usersRoute.js";
import booksRoute from "./src/routes/booksRoute.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { responseClient } from "./src/middleware/responseClient.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleWares

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api endpoints

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);

// api endpoints for books

app.use("/api/v1/books", booksRoute);
// server status
app.get("/", (req, res) => {
  const message = "Server is Working";
  responseClient({ req, res, message });
});

app.use(errorHandler);
connectDB()
  .then(() =>
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log("Server is listening at http://localhost:8000");
    })
  )
  .catch((error) => console.log(error));
