"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resturant = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    address: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
    mobile: { type: String, require: true },
    token: { type: String },
    Role: { type: String, require: true, default: "Restaurant" },
    avatar: { type: String, default: "http://localhost:5000/default/profileDefault.png" },
    OTP: { value: { type: String }, expireIn: { type: Number } }
}, { timestamps: true });
const resturantModel = (0, mongoose_1.model)("resturant", resturant);
exports.default = resturantModel;
