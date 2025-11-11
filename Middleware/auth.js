"use strict";

const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET || "secret_key";
const dbModel = require("../db_2/model/user.js");

// Middleware to protect routes
const authenticate = async (req, res, next) => {
    try {
        //  Get header
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({
                status: 0,
                message: "Access denied. No token provided",
            });
        }

        //  Extract token from "Bearer <token>"
        const token = authHeader.replace("Bearer ", "").trim();

        //  Verify token
        const decoded = jwt.verify(token, key);
        console.log(" Decoded token:", decoded);

        //  Find user in DB
        const user = await dbModel.users.findById(decoded.userId).lean();
        console.log("user:", user);
        if (!user) {
            return res.status(404).json({
                status: 0,
                message: "User not found",
            });
        }

        //  Attach user to request object
        req.user = user;

        //  Continue
        return next();
    } catch (err) {
        console.error(" Auth error:", err.message);
        return res.status(403).json({
            status: 0,
            message: "Invalid or expired token",
        });
    }
};

module.exports = { authenticate };
