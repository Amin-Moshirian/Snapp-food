"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controller/roleController");
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const checkPermission_1 = require("../Validation/checkPermission");
const roleRouter = express_1.default.Router();
roleRouter.put("/set-role/:_id", checkLogin_1.default, checkPermission_1.isOwnerAdmin, roleController_1.setRole);
roleRouter.put("/set-admin/:_id", checkLogin_1.default, checkPermission_1.isOwner, roleController_1.setAdmin);
exports.default = roleRouter;
