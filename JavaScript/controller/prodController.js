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
exports.saveImage = exports.checkproductId = exports.deleteProd = exports.searchProd = exports.editProd = exports.getOneProduct = exports.getProducts = exports.addProd = void 0;
const foodModel_1 = __importDefault(require("../model/foodModel"));
const addProdSchema_1 = __importDefault(require("../Validation/addProdSchema"));
const mongoose_1 = require("mongoose");
;
const addProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield addProdSchema_1.default.validate(req.body, { abortEarly: false });
        yield foodModel_1.default.create(req.body);
        res.status(201).json({ status: 201, success: true, message: "product created" });
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
});
exports.addProd = addProd;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield foodModel_1.default.find({});
        if (!products.length)
            throw { success: false, message: "products not found" };
        res.status(200).json(products);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
});
exports.getProducts = getProducts;
const getOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const product = yield foodModel_1.default.findOne({ _id });
        if (!product)
            throw { success: false, message: "product not found" };
        res.status(200).json(product);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
});
exports.getOneProduct = getOneProduct;
const editProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        for (const key in req.body) {
            if (!["name", "description", "category", "brand", "color", "rating", "price", "countInStock"].includes(key)) {
                throw { success: false, message: "edit product failed" };
            }
            ;
        }
        ;
        const result = yield foodModel_1.default.updateOne({ _id }, req.body);
        res.status(200).json({ status: 200, success: true, message: "product updated" });
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
});
exports.editProd = editProd;
const searchProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield foodModel_1.default.find(query);
        res.json(result);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
});
exports.searchProd = searchProd;
const deleteProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const result = yield foodModel_1.default.deleteOne({ _id });
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) == 0)
            throw { success: false, message: "product deleted failed" };
        res.status(200).json({ status: 200, success: true, message: "product deleted successfully" });
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
});
exports.deleteProd = deleteProd;
const checkproductId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(_id))
            throw { message: "id isn't valid!" };
        if (!(yield foodModel_1.default.findOne({ _id })))
            throw { message: "The product not found" };
        next();
    }
    catch (error) {
        next({ message: error.message });
    }
});
exports.checkproductId = checkproductId;
const saveImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = [];
        const { _id } = req.params;
        for (const item of req.files) {
            images.push(req.protocol + "://" + req.get("host") + item.path.slice(17).replaceAll("\\", "/"));
        }
        ;
        yield foodModel_1.default.updateOne({ _id }, { $push: { images } });
        res.status(200).json({ success: true, message: "product images uploaded" });
    }
    catch (error) {
        next({ message: error.message });
    }
    ;
});
exports.saveImage = saveImage;
