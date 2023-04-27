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
exports.isOwner = exports.isOwnerAdmin = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const restaurantModel_1 = __importDefault(require("../model/restaurantModel"));
const isOwnerAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ mobile: req.username });
        const res = yield restaurantModel_1.default.findOne({ mobile: req.username });
        if (!["Admin", "Owner"].includes(user === null || user === void 0 ? void 0 : user.Role) && !["Admin", "Owner"].includes(res === null || res === void 0 ? void 0 : res.Role))
            throw { status: 403, success: false, message: "شما مجاز به انجام چنین عملیاتی نیستید" };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isOwnerAdmin = isOwnerAdmin;
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ mobile: req.username });
        const res = yield restaurantModel_1.default.findOne({ mobile: req.username });
        if ((user === null || user === void 0 ? void 0 : user.Role) != "Owner" && (res === null || res === void 0 ? void 0 : res.Role) != "Owner")
            throw { status: 403, success: false, message: "شما مجاز به انجام چنین عملیاتی نیستید" };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isOwner = isOwner;
