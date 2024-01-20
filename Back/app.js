const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-route");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const authRoute = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");

const app = express();

/// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
  },
  apis: ["./routes/book-route.js", "./routes/AuthRoute.js"], // Specify the full paths to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/", authRoute);

app.use("/books", router); // localhost:5000/books

mongoose
  .connect(
    "mongodb+srv://ounisaara:ounisaara@librarymanagementsystem.rllqiiq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
