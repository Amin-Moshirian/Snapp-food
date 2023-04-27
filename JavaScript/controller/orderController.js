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
exports.getOrders = exports.getOneOrder = exports.submitOrder = void 0;
const orderModel_1 = __importDefault(require("../model/orderModel"));
const mongoose_1 = require("mongoose");
const submitOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderModel_1.default.create(req.order);
        if (!result)
            throw { message: "لطفا دوباره تلاش کنید" };
        res.status(201).json({ status: 201, success: true, message: "سفارش شما با موفقیت ثبت شد" });
    }
    catch (error) {
        next({ status: 500, message: error.message });
    }
    ;
});
exports.submitOrder = submitOrder;
const getOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(_id))
            throw { message: "آی دی سفارش صحیح نمیباشد" };
        const result = yield orderModel_1.default.find({ _id }, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        if (!result.length)
            throw { message: "تاریخچه سفارشی وجود ندارد" };
        res.status(200).json(result);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
});
exports.getOneOrder = getOneOrder;
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderModel_1.default.find({ user: req.username }, { user: 0, __v: 0, createdAt: 0, updatedAt: 0, shippingAddress: 0 });
        if (!result.length)
            throw { message: "چنین سفارشی ثبت نشده است" };
        res.status(200).json(result);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
});
exports.getOrders = getOrders;
