"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const checkPermission_1 = require("../Validation/checkPermission");
const adminRouter = express_1.default.Router();
adminRouter.post("/set-admin", checkLogin_1.default, (0, checkPermission_1.checkPermission)("Owner"), adminController_1.setAdmin);
exports.default = adminRouter;
