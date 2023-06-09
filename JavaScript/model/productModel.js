"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    brand: { type: String, require: true },
    color: { type: [String], require: true },
    rating: { type: Number, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    images: { type: [String], require: true, default: [] },
}, { timestamps: true });
const productModel = (0, mongoose_1.model)("product", productSchema);
exports.default = productModel;
