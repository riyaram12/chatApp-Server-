"use strict";
const mongoose = require("mongoose");

const dbConfig = require("./dbConfig.js");
const init = async () => {
  try {
    mongoose.set("strictQuery", true);

    console.log(
      "host: ",
      dbConfig.HOST,
      "port: ",
      dbConfig.PORT,
      "db: ",
      dbConfig.DB
    );
    await mongoose.connect(
      `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log("\x1b[36m%s\x1b[0m", "Database initialized successfully!");
    // return;
  } catch (e) {
    console.log("Error at init in dbInit:: ", e?.message || e);
  } finally {
    // process.exit(1);
  }
};

module.exports = { init };
