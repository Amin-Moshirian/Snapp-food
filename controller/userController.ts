import { Request, Response, NextFunction } from "express"
import { isValidObjectId } from "mongoose";
import randomString from "randomstring";
import * as yup from "yup";
import userModel from "../model/userModel";
import { compareHashedString, generateToken, hashString } from "../modules/utils";
import passwordSchima from "../Validation/passwordSchema";
import changeProfileValidation from "../Validation/changeProfileSchema";
import foodModel from "../model/foodModel";
import commentModel from "../model/commentMode";
import restaurantModel from "../model/restaurantModel";


type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: string;
    modifiedCount: number;
    token: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    OTP: { value: string, expireIn: number }
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
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
};


type FoodItem = {
    foodId: {
        name: string;
        description: string;
        rating: number;
        price: number;
    }
}[];


type Comment = {
    Sender: string;
    Text: string;
    foodItem: FoodItem;
};


type Food = {
    _id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    images: string[];
    deletedCount: number;
    length(): 0 | (() => number);
    modifiedCount: number;
};


declare module 'express-serve-static-core' {
    interface Request {
        username: User
    }
};


export const userSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile }: User = req.body;
        await yup.string().length(11, "شماره موبایل باید 11 رقم باشد و با 09 شروع شده باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        const number: User | null = await userModel.findOne({ mobile });
        const resNumber: User | null = await restaurantModel.findOne({ mobile });
        if (number?.mobile || resNumber?.mobile) {
            throw { message: "شماره موبایل به نام شخص دیگری وجود دارد" };
        } else {
            await userModel.create({ mobile });
        }
        res.status(201).json({ status: 201, success: true });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile }: User = req.body;
        await yup.string().length(11, "شماره موبایل باید 11 رقم باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل باید با 09 شروع بشود").required().validate(mobile, { abortEarly: false });
        const user: User | null = await userModel.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (!user) throw { message: "کاربر یافت نشد" };
        user.token = generateToken(user.mobile);
        user.save();
        const userSend: UserSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        res.json(user);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const generatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { password, confirmPassword }: User = req.body;
        await yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد").validate(password, { abortEarly: false });
        if (password !== confirmPassword) throw { message: "رمز عبورها یکسان نیستند" };
        const user: User | null = await userModel.findOne({ mobile: req.username });
        if (user?.password) throw { message: "امکان ثبت دوباره ی رمز عبور وجود ندارد" };
        const result: User = await userModel.updateOne({ mobile: req.username }, { password: hashString(password) });
        if (!result.modifiedCount) throw { message: "خطا در بروزرسانی رمز عبور" };
        res.status(200).json({ status: 200, success: true, message: "رمز عبور با موفقیت بروزرسانی شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { oldPassword, newPassword, confirmNewPassword }: User = req.body;
        const user: User | null = await userModel.findOne({ mobile: req.username });
        if (!user) throw { message: "کاربر یافت نشد" };
        if (!user.password) throw { message: "رمز عبوری برای کاربر وجود ندارد" };
        if (!compareHashedString(oldPassword, user.password)) throw { message: "رمزعبور قدیمی صحیح نمیباشد" };
        await passwordSchima.validate({ newPassword, confirmNewPassword }, { abortEarly: false });
        if (newPassword !== confirmNewPassword)
            throw { message: "رمز عبورها یکسان نیستند" };
        if (oldPassword === newPassword) throw { message: "رمز عبور جدید باید متفاوت با رمز عبور قبلی باشد" };
        await userModel.updateOne({ mobile: req.username }, { password: hashString(newPassword) });
        res.status(200).json({ status: 200, success: true, message: "تغییر رمز عبور با موقثیت انجام شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const changeProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstName, lastName, email }: User = req.body;
        await changeProfileValidation.validate({ firstName, lastName, email }, { abortEarly: false });
        const result: User = await userModel.updateOne({ mobile: req.username }, { firstName, lastName, email });
        if (!result.modifiedCount) throw { message: "خطا در بروزرسانی پروفایل کاربری" };
        res.status(200).json({ status: 200, success: true, message: "پروفایل کاربری بروزرسانی شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: User[] | [] = await userModel.find();
        res.status(200).json(users);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { message: "آی دی معتبر نیست" };
        const user: User | null = await userModel.findOne({ _id: id });
        if (!user) throw { message: "کاربر یافت نشد" };
        res.status(200).json(user);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const deleteAccout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: User = await userModel.deleteOne({ mobile: req.username });
        if (result.deletedCount === 0) throw { message: "خطا در حذف حساب کاربری" };
        res.status(200).json({ status: 200, success: true, message: "حساب کاربری با موفقیت حذف شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: User | null = await userModel.findOne({ mobile: req.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, });
        if (!user) throw { message: "کاربر یافت نشد" };
        res.status(200).json(user);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const saveImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const image: File = req.file;
        const imagePath: string = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        const result: User | null = await userModel.updateOne(
            { mobile: req.username },
            { avatar: imagePath }
        );
        res.status(200).json({ status: 200, success: true, message: "بارگزاری عکس با موفقیت انجام شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userModel.updateOne({ mobile: req.username }, { token: "" });
        res.status(200).json({ status: 200, success: true, message: "کاربر از حساب کاربری خود خارج شد" });
    } catch (error: unknown) {
        next();
    };
};


export const getOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile }: User = req.body;
        await yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        if (!await userModel.findOne({ mobile })) throw { message: "کاربر یافت نشد" };
        const value: string = randomString.generate(5);
        await userModel.updateOne({ mobile }, { OTP: { value, expireIn: Date.now() + 150000 } });
        res.status(200).json({ status: 200, success: true, message: "کد 5 رقمی خود را وارد کنید" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};


export const checkOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile, OTP }: User = req.body;
        await yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile, { abortEarly: false });
        const user: User = await userModel.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (Date.now() > user.OTP.expireIn) throw { message: "کد منقضی شده است" };
        if (OTP.value !== user.OTP.value) throw { message: "کد اشتباه است" };
        user.token = generateToken(user.mobile);
        user.save();
        const userSend: UserSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        delete userSend.OTP;
        res.json(userSend);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const leaveComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { foodItem, Sender, Text }: Comment = JSON.parse(JSON.stringify(req.body));
        for (const item of foodItem) {
            if (!isValidObjectId(item.foodId)) throw { message: "غذا وجود ندارد" };
            const comm: Food = await foodModel.findOne({ _id: item.foodId }, { __v: 0, createdAt: 0, updatedAt: 0 });
            if (!comm) throw { message: "غذا یافت نشد" };
            item.foodId = comm;
        };
        const result: Comment = await commentModel.create({ foodItem, Sender: req.username, Text });
        if (!result) throw { message: "مجدد تلاش کنید" };
        res.status(201).json({ status: 201, success: true, message: "کامنت با موفقیت به ثبت رسید" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};
