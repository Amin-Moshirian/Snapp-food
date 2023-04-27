"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurant = new mongoose_1.Schema({
    password: { type: String, },
    title: { type: String, require: true },
    city: { type: String, require: true },
    mobile: { type: String, require: true },
    shopName: { type: String, require: true },
    ownerFirstName: { type: String, require: true },
    ownerLastName: { type: String, require: true },
    token: { type: String },
    Role: { type: String, default: "Restaurant" },
    avatar: { type: String, default: "http://localhost:5000/default/restaurantDefault.jpg" },
    OTP: { value: { type: String }, expireIn: { type: Number } },
}, { timestamps: true });
const restaurantModel = (0, mongoose_1.model)("resturant", restaurant);
exports.default = restaurantModel;
