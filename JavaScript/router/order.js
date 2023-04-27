"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const orderValidation_1 = __importDefault(require("../Validation/orderValidation"));
const orderController_1 = require("../controller/orderController");
const orderRouter = express_1.default.Router();
orderRouter.post("/submit", checkLogin_1.default, orderValidation_1.default, orderController_1.submitOrder);
orderRouter.get("/:_id", checkLogin_1.default, orderController_1.getOneOrder);
orderRouter.get("/", checkLogin_1.default, orderController_1.getOrders);
exports.default = orderRouter;
