"use strict";

const bcrypt = require("bcrypt");
const dbModels = require("../db_2/model/user.js");
//let key = "secret_key";
const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET;
const User = require("../db_2/model/user.js");

function createNewUser(username, email, password, confirmPassword) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(username, password);
            if (!username || !email || !password || !confirmPassword) {
                return reject(new Error("All fields are required"));
            }
            if (password !== confirmPassword) {
                return reject(new Error("Passwords do not match"));
            }
            // check if user exists
            const existingUser = await dbModels.users.find({
                email: email,
                username: username,
            });
            // console.log(email, existingUser.length);
            // if (existingUser.length >= 0) {
            //     console.log("email..");
            //     // return reject(
            //     //     new Error("email and username are already exists")
            //     // );
            // }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // create new user
            const newUser = await new dbModels.users({
                username,
                email,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                status: "offline",
            });
            const savedUser = await newUser.save();

            resolve(savedUser);
        } catch (e) {
            console.log("userServices.createNewUser", e);
            reject(e);
        }
    });
}

function LoginUser(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!username || !password) {
                console.log("username or password not provided");
                return reject(new Error("username and password are required"));
            }

            const user = await dbModels.users.findOne({ username: username });
            // console.log("user:: ", user);
            if (!user) {
                return reject(new Error("User not found"));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            // console.log("isMatch ::", isMatch);

            if (!isMatch) {
                return reject(new Error("Password does not match"));
            }

            // create jwt token
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                key
                //{ expiresIn: "1h" } // optional
            );

            console.log("token", token);

            return resolve({
                token,
                username: user.username,
                _id: user._id.toString(),
            });
        } catch (e) {
            console.log("userServices.js", e);
            return reject(e);
        }
    });
}

function LogoutUser(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) return reject(new Error("UserID required"));

            const user = await dbModels.users.findById(userId);
            if (!user) return reject(new Error("User not found"));

            user.status = "offline";
            await user.save();

            resolve({ message: "User logged out successfully" });
        } catch (e) {
            reject(e);
        }
    });
}

function getAllUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await dbModels.users.find(
                { status: "offline" },
                { password: 0 }
            );
            console.log("users::", users);
            return resolve(users);
        } catch (e) {
            console.log("userServices.js", e);
            return reject(e);
        }
    });
}
function deleteUser(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                reject("userID required!");
            }
            const user = await dbModels.users.findOne({ _id: userId });
            if (!user) {
                reject("user not found");
            }
            user.status = "hidden";
            user.save();
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

function updateUser(userId, username, email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                reject("userID required!");
            }
            const user = await dbModels.users.findOne({ _id: userId });
            if (!user) {
                reject("user not found");
            }

            user.username = username;
            if (email) {
                // check if email is already in use by another user
                const existingUser = await dbModels.users.findOne({
                    email,
                    _id: { $ne: userId },
                });
                if (existingUser) {
                    throw new Error("Email already exists");
                }
                user.email = email;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;

            user.save();

            return resolve({
                username: user.username,
                status: user.status,
            });
        } catch (e) {
            console.log("error at update user ::", e || e.message);
            reject(e);
        }
    });
}
function searchUsers(query, currentUserId) {
    return new Promise(async (resolve, reject) => {
        try {
            const regex = new RegExp(query, "i"); // case-insensitive search

            const users = await dbModels.users.find(
                {
                    $or: [{ username: regex }, { nickName: regex }],
                    _id: { $ne: currentUserId }, // exclude self
                },
                { password: 0 } // exclude password field
            );

            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}

const getLoggedInUser = async (userId) => {
    try {
        const user = await User.findById(userId).select(
            "username email profilePic"
        );
        return user;
    } catch (error) {
        console.error("Error in getLoggedInUser service:", error);
        throw error;
    }
};

module.exports = {
    createNewUser,
    LoginUser,
    getAllUsers,
    deleteUser,
    updateUser,
    LogoutUser,
    searchUsers,
    getLoggedInUser,
};
