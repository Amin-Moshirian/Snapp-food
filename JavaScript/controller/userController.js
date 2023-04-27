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
exports.leaveComment = exports.checkOtp = exports.getOtp = exports.logOut = exports.saveImage = exports.getProfile = exports.deleteAccout = exports.getUser = exports.getUsers = exports.changeProfile = exports.changePassword = exports.generatePassword = exports.login = exports.userSignUp = void 0;
const mongoose_1 = require("mongoose");
const randomstring_1 = __importDefault(require("randomstring"));
const yup = __importStar(require("yup"));
const userModel_1 = __importDefault(require("../model/userModel"));
const utils_1 = require("../modules/utils");
const passwordSchema_1 = __importDefault(require("../Validation/passwordSchema"));
const changeProfileSchema_1 = __importDefault(require("../Validation/changeProfileSchema"));
const foodModel_1 = __importDefault(require("../model/foodModel"));
const commentMode_1 = __importDefault(require("../model/commentMode"));
const restaurantModel_1 = __importDefault(require("../model/restaurantModel"));
;
const userSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        yield yup.string().length(11, "شماره موبایل باید 11 رقم باشد و با 09 شروع شده باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        const number = yield userModel_1.default.findOne({ mobile });
        const resNumber = yield restaurantModel_1.default.findOne({ mobile });
        if ((number === null || number === void 0 ? void 0 : number.mobile) || (resNumber === null || resNumber === void 0 ? void 0 : resNumber.mobile)) {
            throw { message: "شماره موبایل به نام شخص دیگری وجود دارد" };
        }
        else {
            yield userModel_1.default.create({ mobile });
        }
        res.status(201).json({ status: 201, success: true });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.userSignUp = userSignUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        yield yup.string().length(11, "شماره موبایل باید 11 رقم باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل باید با 09 شروع بشود").required().validate(mobile, { abortEarly: false });
        const user = yield userModel_1.default.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (!user)
            throw { message: "کاربر یافت نشد" };
        user.token = (0, utils_1.generateToken)(user.mobile);
        user.save();
        const userSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        res.json(user);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.login = login;
const generatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword } = req.body;
        yield yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد").validate(password, { abortEarly: false });
        if (password !== confirmPassword)
            throw { message: "رمز عبورها یکسان نیستند" };
        const user = yield userModel_1.default.findOne({ mobile: req.username });
        if (user === null || user === void 0 ? void 0 : user.password)
            throw { message: "امکان ثبت دوباره ی رمز عبور وجود ندارد" };
        const result = yield userModel_1.default.updateOne({ mobile: req.username }, { password: (0, utils_1.hashString)(password) });
        if (!result.modifiedCount)
            throw { message: "خطا در بروزرسانی رمز عبور" };
        res.status(200).json({ status: 200, success: true, message: "رمز عبور با موفقیت بروزرسانی شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.generatePassword = generatePassword;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const user = yield userModel_1.default.findOne({ mobile: req.username });
        if (!user)
            throw { message: "کاربر یافت نشد" };
        if (!user.password)
            throw { message: "رمز عبوری برای کاربر وجود ندارد" };
        if (!(0, utils_1.compareHashedString)(oldPassword, user.password))
            throw { message: "رمزعبور قدیمی صحیح نمیباشد" };
        yield passwordSchema_1.default.validate({ newPassword, confirmNewPassword }, { abortEarly: false });
        if (newPassword !== confirmNewPassword)
            throw { message: "رمز عبورها یکسان نیستند" };
        if (oldPassword === newPassword)
            throw { message: "رمز عبور جدید باید متفاوت با رمز عبور قبلی باشد" };
        yield userModel_1.default.updateOne({ mobile: req.username }, { password: (0, utils_1.hashString)(newPassword) });
        res.status(200).json({ status: 200, success: true, message: "تغییر رمز عبور با موقثیت انجام شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.changePassword = changePassword;
const changeProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        yield changeProfileSchema_1.default.validate({ firstName, lastName, email }, { abortEarly: false });
        const result = yield userModel_1.default.updateOne({ mobile: req.username }, { firstName, lastName, email });
        if (!result.modifiedCount)
            throw { message: "خطا در بروزرسانی پروفایل کاربری" };
        res.status(200).json({ status: 200, success: true, message: "پروفایل کاربری بروزرسانی شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.changeProfile = changeProfile;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw { message: "آی دی معتبر نیست" };
        const user = yield userModel_1.default.findOne({ _id: id });
        if (!user)
            throw { message: "کاربر یافت نشد" };
        res.status(200).json(user);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getUser = getUser;
const deleteAccout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userModel_1.default.deleteOne({ mobile: req.username });
        if (result.deletedCount === 0)
            throw { message: "خطا در حذف حساب کاربری" };
        res.status(200).json({ status: 200, success: true, message: "حساب کاربری با موفقیت حذف شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.deleteAccout = deleteAccout;
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ mobile: req.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, });
        if (!user)
            throw { message: "کاربر یافت نشد" };
        res.status(200).json(user);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.getProfile = getProfile;
const saveImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        const imagePath = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        const result = yield userModel_1.default.updateOne({ mobile: req.username }, { avatar: imagePath });
        res.status(200).json({ status: 200, success: true, message: "بارگزاری عکس با موفقیت انجام شد" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.saveImage = saveImage;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.updateOne({ mobile: req.username }, { token: "" });
        res.status(200).json({ status: 200, success: true, message: "کاربر از حساب کاربری خود خارج شد" });
    }
    catch (error) {
        next();
    }
    ;
});
exports.logOut = logOut;
const getOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        yield yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        if (!(yield userModel_1.default.findOne({ mobile })))
            throw { message: "کاربر یافت نشد" };
        const value = randomstring_1.default.generate(5);
        yield userModel_1.default.updateOne({ mobile }, { OTP: { value, expireIn: Date.now() + 150000 } });
        res.status(200).json({ status: 200, success: true, message: "کد 5 رقمی خود را وارد کنید" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message || error.errors });
    }
    ;
});
exports.getOtp = getOtp;
const checkOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile, OTP } = req.body;
        yield yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        const user = yield userModel_1.default.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (Date.now() > user.OTP.expireIn)
            throw { message: "کد منقضی شده است" };
        if (OTP.value !== user.OTP.value)
            throw { message: "کد اشتباه است" };
        user.token = (0, utils_1.generateToken)(user.mobile);
        user.save();
        const userSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        delete userSend.OTP;
        res.json(userSend);
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.checkOtp = checkOtp;
const leaveComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodItem, Sender, Text } = JSON.parse(JSON.stringify(req.body));
        for (const item of foodItem) {
            if (!(0, mongoose_1.isValidObjectId)(item.foodId))
                throw { message: "غذا وجود ندارد" };
            const comm = yield foodModel_1.default.findOne({ _id: item.foodId }, { __v: 0, createdAt: 0, updatedAt: 0 });
            if (!comm)
                throw { message: "غذا یافت نشد" };
            item.foodId = comm;
        }
        ;
        const result = yield commentMode_1.default.create({ foodItem, Sender: req.username, Text });
        if (!result)
            throw { message: "مجدد تلاش کنید" };
        res.status(201).json({ status: 201, success: true, message: "کامنت با موفقیت به ثبت رسید" });
    }
    catch (error) {
        next({ status: 400, success: false, message: error.message });
    }
    ;
});
exports.leaveComment = leaveComment;
