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
exports.getOneRest = exports.getRests = exports.checkResOtp = exports.getResOtp = exports.resLogOut = exports.saveResImage = exports.getResProfile = exports.deleteResAccout = exports.changeResPassword = exports.generateResPassword = exports.changeResProfile = exports.resLogin = exports.restaurantSignUp = void 0;
const mongoose_1 = require("mongoose");
const restaurantModel_1 = __importDefault(require("../model/restaurantModel"));
const restaurantSchima_1 = __importDefault(require("../Validation/restaurantSchima"));
const utils_1 = require("../modules/utils");
const yup = __importStar(require("yup"));
const randomstring_1 = __importDefault(require("randomstring"));
const passwordSchema_1 = __importDefault(require("../Validation/passwordSchema"));
const changeResProfSchema_1 = __importDefault(require("../Validation/changeResProfSchema"));
const userModel_1 = __importDefault(require("../model/userModel"));
;
const restaurantSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, city, mobile, shopName, ownerFirstName, ownerLastName } = req.body;
        yield restaurantSchima_1.default.validate({ title, city, mobile, shopName, ownerFirstName, ownerLastName }, { abortEarly: false });
        const number = yield restaurantModel_1.default.findOne({ mobile });
        const userNumber = yield userModel_1.default.findOne({ mobile });
        if (number === null || number === void 0 ? void 0 : number.shopName)
            throw { message: "نام فروشگاه وجود دارد" };
        if ((number === null || number === void 0 ? void 0 : number.mobile) || (userNumber === null || userNumber === void 0 ? void 0 : userNumber.mobile)) {
            throw { message: "شماره موبایل به نام دیگری ثبت شده است" };
        }
        else {
            yield restaurantModel_1.default.create({ title, city, mobile, shopName, ownerFirstName, ownerLastName });
        }
        ;
        res.status(201).json({ status: 201, success: true });
    }
    catch (error) {
        next({ sstatus: 400, success: false, message: error.message || error.errors });
    }
});
exports.restaurantSignUp = restaurantSignUp;
const resLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        yield yup.string().length(11, "شماره موبایل باید 11 رقم باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل باید با 09 شروع بشود").required().validate(mobile, { abortEarly: false });
        const rest = yield restaurantModel_1.default.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (!rest)
            throw { message: "رستوران یافت نشد" };
        rest.token = (0, utils_1.generateToken)(rest.mobile);
        rest.save();
        const userSend = JSON.parse(JSON.stringify(rest));
        delete userSend.password;
        res.json(rest);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.resLogin = resLogin;
const changeResProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, city, shopName, ownerFirstName, ownerLastName } = req.body;
        yield changeResProfSchema_1.default.validate({ title, city, shopName, ownerFirstName, ownerLastName }, { abortEarly: false });
        const result = yield restaurantModel_1.default.updateOne({ mobile: req.username }, { title, city, shopName, ownerFirstName, ownerLastName });
        if (!result.modifiedCount)
            throw { message: "خطا در بروزرسانی پروفایل رستوران" };
        res.status(200).json({ status: 200, success: true, message: "پروفایل رستوران بروزرسانی شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.changeResProfile = changeResProfile;
const generateResPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword } = req.body;
        yield yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد").validate(password, { abortEarly: false });
        if (password !== confirmPassword)
            throw { message: "رمز عبورها یکسان نیستند" };
        const rest = yield restaurantModel_1.default.findOne({ mobile: req.username });
        if (rest === null || rest === void 0 ? void 0 : rest.password)
            throw { message: "امکان ثبت دوباره ی رمز عبور وجود ندارد" };
        const result = yield restaurantModel_1.default.updateOne({ mobile: req.username }, { password: (0, utils_1.hashString)(password) });
        if (!result.modifiedCount)
            throw { message: "خطا در بروزرسانی رمز عبور" };
        res.status(200).json({ status: 200, success: true, message: "رمز عبور با موفقیت بروزرسانی شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.generateResPassword = generateResPassword;
const changeResPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const rest = yield restaurantModel_1.default.findOne({ mobile: req.username });
        if (!rest)
            throw { message: "رستوران یافت نشد" };
        if (!rest.password)
            throw { message: "رمز عبوری برای رستوران وجود ندارد" };
        if (!(0, utils_1.compareHashedString)(oldPassword, rest.password))
            throw { message: "رمزعبور قدیمی صحیح نمیباشد" };
        yield passwordSchema_1.default.validate({ newPassword, confirmNewPassword }, { abortEarly: false });
        if (newPassword !== confirmNewPassword)
            throw { message: "رمز عبورها یکسان نیستند" };
        if (oldPassword === newPassword)
            throw { message: "رمز عبور جدید باید متفاوت با رمز عبور قبلی باشد" };
        const result = yield restaurantModel_1.default.updateOne({ mobile: req.username }, { password: (0, utils_1.hashString)(newPassword) });
        if (!result.modifiedCount)
            throw { message: "خطا در بروزرسانی رمزعبور" };
        res.status(200).json({ status: 200, success: true, message: "تغییر رمز عبور با موقثیت انجام شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.changeResPassword = changeResPassword;
const deleteResAccout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurantModel_1.default.deleteOne({ mobile: req.username });
        if (result.deletedCount === 0)
            throw { message: "خطا در حذف حساب رستوران" };
        res.status(200).json({ status: 200, success: true, message: "حساب رستوران با موفقیت حذف شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.deleteResAccout = deleteResAccout;
const getResProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rest = yield restaurantModel_1.default.findOne({ mobile: req.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, });
        if (!rest)
            throw { message: "رستوران یافت نشد" };
        res.status(200).json(rest);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getResProfile = getResProfile;
const saveResImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        const imagePath = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        const result = yield restaurantModel_1.default.updateOne({ mobile: req.username }, { avatar: imagePath });
        res.status(200).json({ status: 200, success: true, message: "بارگزاری عکس با موفقیت انجام شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.saveResImage = saveResImage;
const resLogOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield restaurantModel_1.default.updateOne({ mobile: req.username }, { token: "" });
        res.status(200).json({ status: 200, success: true, message: "رستوران از حساب کاربری خود خارج شد" });
    }
    catch (error) {
        next();
    }
    ;
});
exports.resLogOut = resLogOut;
const getResOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        yield yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        if (!(yield restaurantModel_1.default.findOne({ mobile })))
            throw { message: "رستوران یافت نشد" };
        const value = randomstring_1.default.generate(5);
        yield restaurantModel_1.default.updateOne({ mobile }, { OTP: { value, expireIn: Date.now() + 150000 } });
        res.status(200).json({ status: 200, success: true, message: "کد 5 رقمی خود را وارد کنید" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.getResOtp = getResOtp;
const checkResOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile, OTP } = req.body;
        yield yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        const rest = yield restaurantModel_1.default.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (Date.now() > rest.OTP.expireIn)
            throw { message: "کد منقضی شده است" };
        if (OTP.value !== rest.OTP.value)
            throw { message: "کد اشتباه است" };
        rest.token = (0, utils_1.generateToken)(rest.mobile);
        rest.save();
        const userSend = JSON.parse(JSON.stringify(rest));
        delete userSend.password;
        delete userSend.OTP;
        res.json(userSend);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.checkResOtp = checkResOtp;
const getRests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rests = yield restaurantModel_1.default.find();
        res.status(200).json(rests);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getRests = getRests;
const getOneRest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw { message: "آی دی معتبر نیست" };
        const rest = yield restaurantModel_1.default.findOne({ _id: id });
        if (!rest)
            throw { message: "رستوران یافت نشد" };
        res.status(200).json(rest);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getOneRest = getOneRest;
