"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    rating: { type: Number, require: true },
    price: { type: Number, require: true },
    isActive: { type: Boolean, require: true, default: true },
    images: { type: [String], require: true, default: [] },
    user: { type: String, require: true },
}, { timestamps: true });
const foodModel = (0, mongoose_1.model)("food", foodSchema);
exports.default = foodModel;
