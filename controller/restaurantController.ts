import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import restaurantModel from "../model/restaurantModel";
import restaurantSchima from "../Validation/restaurantSchima";
import { compareHashedString, generateToken, hashString } from "../modules/utils";
import * as yup from "yup";
import randomString from "randomstring";
import passwordSchima from "../Validation/passwordSchema";
import changeResProfSchema from "../Validation/changeResProfSchema";
import userModel from "../model/userModel";


type Rest = {
    password: string;
    confirmPassword: string;
    mobile: string;
    modifiedCount: number;
    token: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    OTP: { value: string, expireIn: number };
    save(): void;
    title: string;
    city: string;
    shopName: string;
    ownerFirstName: string;
    ownerLastName: string;
    deletedCount: number;
};


type UserSend = {
    password?: string;
    OTP?: { value: string, expireIn: number };
};


type File = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
};

declare module 'express-serve-static-core' {
    interface Request {
        files: any;
    }
};


export const restaurantSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, city, mobile, shopName, ownerFirstName, ownerLastName }: Rest = req.body;
        await restaurantSchima.validate({ title, city, mobile, shopName, ownerFirstName, ownerLastName }, { abortEarly: false });
        const number: Rest | null = await restaurantModel.findOne({ mobile });
        const userNumber: Rest | null = await userModel.findOne({ mobile });
        if (number?.shopName) throw { message: "نام فروشگاه وجود دارد" };
        if (number?.mobile || userNumber?.mobile) {
            throw { message: "شماره موبایل به نام دیگری ثبت شده است" };
        } else {
            await restaurantModel.create({ title, city, mobile, shopName, ownerFirstName, ownerLastName });
        };
        res.status(201).json({ status: 201, success: true });
    } catch (error: any) {
        next({ sstatus: 400, success: false, message: error.message || error.errors });
    }
};


export const resLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile }: Rest = req.body;
        await yup.string().length(11, "شماره موبایل باید 11 رقم باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل باید با 09 شروع بشود").required().validate(mobile, { abortEarly: false });
        const rest: Rest | null = await restaurantModel.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 })
        if (!rest) throw { message: "رستوران یافت نشد" };
        rest.token = generateToken(rest.mobile);
        rest.save();
        const userSend: UserSend = JSON.parse(JSON.stringify(rest));
        delete userSend.password;
        res.json(rest);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const changeResProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, city, shopName, ownerFirstName, ownerLastName }: Rest = req.body;
        await changeResProfSchema.validate({ title, city, shopName, ownerFirstName, ownerLastName }, { abortEarly: false });
        const result: Rest = await restaurantModel.updateOne({ mobile: req.username }, { title, city, shopName, ownerFirstName, ownerLastName });
        if (!result.modifiedCount) throw { message: "خطا در بروزرسانی پروفایل رستوران" };
        res.status(200).json({ status: 200, success: true, message: "پروفایل رستوران بروزرسانی شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const generateResPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { password, confirmPassword }: Rest = req.body;
        await yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد").validate(password, { abortEarly: false });
        if (password !== confirmPassword) throw { message: "رمز عبورها یکسان نیستند" };
        const rest: Rest | null = await restaurantModel.findOne({ mobile: req.username });
        if (rest?.password) throw { message: "امکان ثبت دوباره ی رمز عبور وجود ندارد" };
        const result: Rest = await restaurantModel.updateOne({ mobile: req.username }, { password: hashString(password) });
        if (!result.modifiedCount) throw { message: "خطا در بروزرسانی رمز عبور" };
        res.status(200).json({ status: 200, success: true, message: "رمز عبور با موفقیت بروزرسانی شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const changeResPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { oldPassword, newPassword, confirmNewPassword }: Rest = req.body;
        const rest: Rest | null = await restaurantModel.findOne({ mobile: req.username });
        if (!rest) throw { message: "رستوران یافت نشد" };
        if (!rest.password) throw { message: "رمز عبوری برای رستوران وجود ندارد" };
        if (!compareHashedString(oldPassword, rest.password)) throw { message: "رمزعبور قدیمی صحیح نمیباشد" };
        await passwordSchima.validate({ newPassword, confirmNewPassword }, { abortEarly: false });
        if (newPassword !== confirmNewPassword)
            throw { message: "رمز عبورها یکسان نیستند" };
        if (oldPassword === newPassword) throw { message: "رمز عبور جدید باید متفاوت با رمز عبور قبلی باشد" };
        const result = await restaurantModel.updateOne({ mobile: req.username }, { password: hashString(newPassword) });
        if (!result.modifiedCount) throw { message: "خطا در بروزرسانی رمزعبور" };
        res.status(200).json({ status: 200, success: true, message: "تغییر رمز عبور با موقثیت انجام شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const deleteResAccout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: Rest = await restaurantModel.deleteOne({ mobile: req.username });
        if (result.deletedCount === 0) throw { message: "خطا در حذف حساب رستوران" };
        res.status(200).json({ status: 200, success: true, message: "حساب رستوران با موفقیت حذف شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const getResProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rest: Rest | null = await restaurantModel.findOne({ mobile: req.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, });
        if (!rest) throw { message: "رستوران یافت نشد" };
        res.status(200).json(rest);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const saveResImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const image: File = req.file;
        const imagePath: string = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        const result: Rest | null = await restaurantModel.updateOne(
            { mobile: req.username },
            { avatar: imagePath }
        );
        res.status(200).json({ status: 200, success: true, message: "بارگزاری عکس با موفقیت انجام شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const resLogOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await restaurantModel.updateOne({ mobile: req.username }, { token: "" });
        res.status(200).json({ status: 200, success: true, message: "رستوران از حساب کاربری خود خارج شد" });
    } catch (error: unknown) {
        next();
    };
};


export const getResOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile }: Rest = req.body;
        await yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        if (!await restaurantModel.findOne({ mobile })) throw { message: "رستوران یافت نشد" };
        const value: string = randomString.generate(5)
        await restaurantModel.updateOne({ mobile }, { OTP: { value, expireIn: Date.now() + 150000 } });
        res.status(200).json({ status: 200, success: true, message: "کد 5 رقمی خود را وارد کنید" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const checkResOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile, OTP }: Rest = req.body;
        await yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        const rest: Rest = await restaurantModel.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (Date.now() > rest.OTP.expireIn) throw { message: "کد منقضی شده است" };
        if (OTP.value !== rest.OTP.value) throw { message: "کد اشتباه است" };
        rest.token = generateToken(rest.mobile);
        rest.save();
        const userSend: UserSend = JSON.parse(JSON.stringify(rest));
        delete userSend.password;
        delete userSend.OTP;
        res.json(userSend);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};

export const getRests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rests: Rest[] | [] = await restaurantModel.find();
        res.status(200).json(rests);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const getOneRest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { message: "آی دی معتبر نیست" };
        const rest: Rest | null = await restaurantModel.findOne({ _id: id });
        if (!rest) throw { message: "رستوران یافت نشد" };
        res.status(200).json(rest);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};