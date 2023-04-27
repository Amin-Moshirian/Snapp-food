"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    title: { type: String, default: "" }
}, { timestamps: true });
const roleModel = (0, mongoose_1.model)("role", roleSchema);
exports.default = roleModel;
