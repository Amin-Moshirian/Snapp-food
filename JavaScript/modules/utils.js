"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFilePath = exports.compareToken = exports.generateToken = exports.compareHashedString = exports.hashString = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
dotenv.config({ path: './.env' });
const hashString = (str) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(str, salt);
};
exports.hashString = hashString;
const compareHashedString = (data, hashedString) => {
    return bcrypt_1.default.compareSync(data, hashedString);
};
exports.compareHashedString = compareHashedString;
const generateToken = (payLoad) => {
    return jsonwebtoken_1.default.sign({ data: payLoad }, process.env.SECRET_KEY, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
const compareToken = (payLoad) => {
    return jsonwebtoken_1.default.verify(payLoad, process.env.SECRET_KEY);
};
exports.compareToken = compareToken;
const uploadFilePath = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const fileAddress = path_1.default.join(__dirname, "..", "public", "uploads", "images", String(year), String(month + 1), String(day));
    fs.mkdirSync(fileAddress, { recursive: true });
    return path_1.default.join("JavaScript", "public", "uploads", "images", String(year), String(month + 1), String(day));
};
exports.uploadFilePath = uploadFilePath;
