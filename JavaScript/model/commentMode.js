"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    foodItem: [{
            foodId: {
                name: { type: String, require: true },
                description: { type: String, require: true },
                rating: { type: Number, require: true },
                price: { type: Number, require: true },
            }
        }],
    Sender: { type: String, require: true },
    Text: { type: String, require: true },
}, { timestamps: true });
const commentModel = (0, mongoose_1.model)("comment", commentSchema);
exports.default = commentModel;
