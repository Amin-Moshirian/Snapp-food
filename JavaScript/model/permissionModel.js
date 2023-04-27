"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const permissionSchema = new mongoose_1.Schema({
    name: { type: String, default: "" },
    description: { type: String, default: "" }
}, { timestamps: true });
const permissionModel = (0, mongoose_1.model)("permission", permissionSchema);
exports.default = permissionModel;
