// /index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const flightRoutes = require("./routes/flights");
const tokenVerification = require('./middleware/tokenVerification');
const connection = require('./db');
connection();

app.use(cors());
app.use(express.json());

// Middleware
app.get("/api/users/", tokenVerification);
app.get("/api/users/myUser", tokenVerification);
app.get("/api/users/delete", tokenVerification);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));



// /index.js
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const recipeRoutes = require("./routes/recipe");
// const tokenVerification = require('./middleware/tokenVerification');
// const connection = require('./db');
// connection();
//
// app.use(cors());
// app.use(express.json());
//
// //middleware
// app.get("/api/users/", tokenVerification);
// app.get("/api/users/myUser", tokenVerification);
// app.get("/api/users/delete", tokenVerification);
//
// // routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// //app.use("/api/recipes", recipeRoutes);
//
// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));
//
