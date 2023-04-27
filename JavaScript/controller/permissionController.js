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
exports.removePermission = exports.addPermission = exports.getPermission = void 0;
const permissionModel_1 = __importDefault(require("../model/permissionModel"));
const getPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permission = yield permissionModel_1.default.find({});
        res.status(201).json(permission);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.getPermission = getPermission;
const addPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield permissionModel_1.default.create(req.body);
        res.status(201).json({ status: 201, success: true, message: "مجوز ایجاد شد" });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.addPermission = addPermission;
const removePermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        yield permissionModel_1.default.delete({ _id });
        res.status(200).json({ status: 200, success: true, message: "مجوز حذف شد" });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.removePermission = removePermission;
