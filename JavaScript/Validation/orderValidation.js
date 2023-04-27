"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const submitOrderSchema_1 = __importDefault(require("./submitOrderSchema"));
const mongoose_1 = require("mongoose");
const foodModel_1 = __importDefault(require("../model/foodModel"));
;
const orderValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderItem, shippingAddress, paymentMethod } = JSON.parse(JSON.stringify(req.body));
        yield submitOrderSchema_1.default.validate(shippingAddress, { abortEarly: false });
        if (!["online"].includes(paymentMethod))
            throw { message: "روش پرداخت فقط به صورت آنلاین میباشد" };
        let totalPrice = 0;
        for (const item of orderItem) {
            if (!(0, mongoose_1.isValidObjectId)(item.foodId))
                throw { message: "آی دی غذا صحیح نمیباشد" };
            const food = yield foodModel_1.default.findOne({ _id: item.foodId }, { __v: 0, createdAt: 0, updatedAt: 0 });
            if (!food)
                throw { message: "غذا یافت نشد" };
            item.foodId = food;
            totalPrice += item.qty * food.price;
        }
        ;
        totalPrice += 5;
        const orderSubmitData = { orderItem, shippingAddress, paymentMethod, totalPrice, user: req.username };
        req.order = orderSubmitData;
        next();
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
    ;
});
exports.default = orderValidation;
