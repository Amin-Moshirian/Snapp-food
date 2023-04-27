"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    orderItem: [
        {
            foodId: {
                name: { type: String, require: true },
                description: { type: String, require: true },
                rating: { type: Number, require: true },
                price: { type: Number, require: true },
                isActive: { type: Boolean, require: true, default: true },
                images: { type: [String], require: true, default: [] },
                user: { type: String, require: true },
            },
            qty: { type: Number, require: true }
        },
    ],
    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: Number, require: true },
    },
    paymentMethod: { type: String, require: true },
    shippingPrice: { type: Number, require: true, default: 5 },
    totalPrice: { type: Number, require: true },
    user: { type: String, require: true },
}, { timestamps: true });
const orderModel = (0, mongoose_1.model)("order", orderSchema);
exports.default = orderModel;
