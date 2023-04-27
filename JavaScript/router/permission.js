"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const permissionController_1 = require("../controller/permissionController");
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const checkPermission_1 = require("../Validation/checkPermission");
const permissionRouter = express_1.default.Router();
permissionRouter.get("/", checkLogin_1.default, (0, checkPermission_1.checkPermission)("Admin"), permissionController_1.getPermission);
permissionRouter.post("/add", checkLogin_1.default, (0, checkPermission_1.checkPermission)("Admin"), permissionController_1.addPermission);
permissionRouter.delete("/remove/:_id", checkLogin_1.default, (0, checkPermission_1.checkPermission)("Admin"), permissionController_1.removePermission);
exports.default = permissionRouter;
