"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, },
    password: { type: String, },
    mobile: { type: String, },
    token: { type: String },
    Role: { type: String, default: "User" },
    avatar: { type: String, default: "http://localhost:5000/default/profileDefault.png" },
    OTP: { value: { type: String }, expireIn: { type: Number } }
}, { timestamps: true });
const userModel = (0, mongoose_1.model)("user", userSchema);
exports.default = userModel;
