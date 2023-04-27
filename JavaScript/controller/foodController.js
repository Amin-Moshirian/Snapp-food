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
exports.saveImages = exports.checkFoodId = exports.deleteFood = exports.searchFood = exports.editFood = exports.getOneFood = exports.getFoods = exports.addFood = void 0;
const foodModel_1 = __importDefault(require("../model/foodModel"));
const mongoose_1 = require("mongoose");
const foodSchema_1 = __importDefault(require("../Validation/foodSchema"));
const editFoodSchema_1 = __importDefault(require("../Validation/editFoodSchema"));
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, rating, price, isActive } = req.body;
        yield foodSchema_1.default.validate({ name, description, rating, price, isActive }, { abortEarly: false });
        yield foodModel_1.default.create({ name, description, rating, price, isActive, user: req.username });
        res.status(201).json({ status: 201, success: true, message: "غذا به لیست منو اضافه شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.addFood = addFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield foodModel_1.default.find({});
        if (!food.length)
            throw { success: false, message: "غذا یافت نشد" };
        res.status(200).json(food);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getFoods = getFoods;
const getOneFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const food = yield foodModel_1.default.findOne({ _id });
        if (!food)
            throw { success: false, message: "غذا یافت نشد" };
        res.status(200).json(food);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getOneFood = getOneFood;
const editFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const key in req.body) {
            if (!["name", "description", "rating", "price", "isActive",].includes(key)) {
                throw { success: false, message: "خطا در اصلاح غذا" };
            }
            ;
        }
        ;
        const { _id } = req.params;
        const { name, description, rating, price, isActive } = req.body;
        yield editFoodSchema_1.default.validate({ name, description, rating, price, isActive }, { abortEarly: false });
        const food = yield foodModel_1.default.updateOne({ _id }, { name, description, rating, price, isActive });
        if (!food.modifiedCount)
            throw { message: "خطا در بروزرسانی غذا" };
        res.status(200).json({ status: 200, success: true, message: "غذا بروزرسانی شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.editFood = editFood;
const searchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield foodModel_1.default.find(query);
        res.json(result);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.searchFood = searchFood;
const deleteFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const result = yield foodModel_1.default.deleteOne({ _id });
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) == 0)
            throw { success: false, message: "خطا در حذف غذا" };
        res.status(200).json({ status: 200, success: true, message: "غذا با موفقیت حذف شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.deleteFood = deleteFood;
const checkFoodId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(_id))
            throw { message: "آی دی غذا معتبر نیست" };
        if (!(yield foodModel_1.default.findOne({ _id })))
            throw { message: "غذا یافت نشد" };
        next();
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
});
exports.checkFoodId = checkFoodId;
const saveImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = [];
        const { _id } = req.params;
        for (const item of req.files) {
            images.push(req.protocol + "://" + req.get("host") + item.path.slice(17).replaceAll("\\", "/"));
        }
        ;
        yield foodModel_1.default.updateOne({ _id }, { $push: { images } });
        res.status(200).json({ success: true, message: "عکس با موفقیت آپلود شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.saveImages = saveImages;
