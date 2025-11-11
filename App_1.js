// "use strict";
// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.listen(3000, function () {
//   console.log("running on port 3000");
// });

// //define routes
// const users_router = require("");

// const createError = require("http-errors");

// const init = async () => {
//   try {
//     // TO allow cross-origin requests
//     app.use(cors());

//     // Middleware to log request URLs
//     app.use((req, res, next) => {
//       console.log("req.url :: ", req.url);
//       next();
//     });
//     // Middleware to parse JSON and URL-encoded data
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));

//     // Registering routes
//     app.use("/users", users_router);

//     // Middleware to handle errors
//     app.use((req, res, next) => {
//       next(createError(404));
//     });
//   } catch (e) {
//     console.log("Error at app.init :: ", e);
//   }
// };
// init();

// module.exports = app;
