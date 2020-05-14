const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const contactRoutes = require("./routes/contact");
const mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect(
  "mongodb+srv://barada:EWXmjNYDTz2MLrpJ@cluster0-mc1jz.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,Connection-Type,Accept,Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "PUT, POST , PATCH , DELETE , GET"
//     );
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/contact", contactRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports = app;
