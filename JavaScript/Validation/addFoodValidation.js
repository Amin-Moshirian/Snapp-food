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
const mongoose_1 = require("mongoose");
const restaurantModel_1 = __importDefault(require("../model/restaurantModel"));
const FoodSchema_1 = __importDefault(require("./FoodSchema"));
;
;
const addFoodValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let food = JSON.parse(JSON.stringify(req.body));
        yield FoodSchema_1.default.validate(food, { abortEarly: false });
        const _id = req.params.id;
        if (!(0, mongoose_1.isValidObjectId)(_id))
            throw { message: "آی دی رستوران صحیح نمیباشد" };
        const rest = yield restaurantModel_1.default.findOne({ _id }, { __v: 0, createdAt: 0, updatedAt: 0, city: 0, mobile: 0, ownerFirstName: 0, ownerLastName: 0 });
        if (!rest)
            throw { message: "رستوران موجود نمیباشد" };
        const restaurantData = { food };
        req.addFood = restaurantData;
        next();
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
    ;
});
exports.default = addFoodValidation;
