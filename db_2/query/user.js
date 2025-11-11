"use strict";

const User = require("../model/user.js").users;
const errors = require("../../../utils/errors.js");
require("../dbinit.js").init();

const addUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = await new User({
        userName: "R_1",
        password: "R_123",
      });

      const savedUser = await newUser.save();
      console.log("User saved successfully:", savedUser);
      return resolve(savedUser);
    } catch (e) {
      console.log("Error :: ", e);
      return reject(errors.unknownError);
    }
  });
};

setTimeout(addUser(), 2000);
