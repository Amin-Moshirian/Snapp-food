import { NextFunction, Request, Response } from "express";
import foodModel from "../model/foodModel";
import { isValidObjectId } from "mongoose";
import foodSchema from "../Validation/foodSchema";
import editFoodSchema from "../Validation/editFoodSchema";


type Food = {
    name: string;
    description: string;
    rating: number;
    price: number;
    deletedCount: number;
    isActive: boolean;
    modifiedCount: number;
};


export const addFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, description, rating, price, isActive }: Food = req.body;
        await foodSchema.validate({ name, description, rating, price, isActive }, { abortEarly: false });
        await foodModel.create({ name, description, rating, price, isActive, user: req.username });
        res.status(201).json({ status: 201, success: true, message: "غذا به لیست منو اضافه شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message || error.errors });
    };
};

export const getFoods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const food: Food[] | [] = await foodModel.find({});
        if (!food.length) throw { success: false, message: "غذا یافت نشد" };
        res.status(200).json(food);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const getOneFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.params.id;
        const food: Food | null = await foodModel.findOne({ _id });
        if (!food) throw { success: false, message: "غذا یافت نشد" };
        res.status(200).json(food);
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const editFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        for (const key in req.body) {
            if (!["name", "description", "rating", "price", "isActive",].includes(key)) {
                throw { success: false, message: "خطا در اصلاح غذا" }
            };
        };
        const { _id } = req.params;

        const { name, description, rating, price, isActive }: Food = req.body;
        await editFoodSchema.validate({ name, description, rating, price, isActive }, { abortEarly: false });
        const food: Food = await foodModel.updateOne({ _id }, { name, description, rating, price, isActive });
        if (!food.modifiedCount) throw { message: "خطا در بروزرسانی غذا" };
        res.status(200).json({ status: 200, success: true, message: "غذا بروزرسانی شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const searchFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const query = req.query;
        const result: [] | Food[] = await foodModel.find(query);
        res.json(result)
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const deleteFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        const result: Food | null = await foodModel.deleteOne({ _id });
        if (result?.deletedCount == 0) throw { success: false, message: "خطا در حذف غذا" };
        res.status(200).json({ status: 200, success: true, message: "غذا با موفقیت حذف شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};


export const checkFoodId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        if (!isValidObjectId(_id)) throw { message: "آی دی غذا معتبر نیست" };
        if (!await foodModel.findOne({ _id })) throw { message: "غذا یافت نشد" };
        next();
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    }
};


export const saveImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const images: string[] = [];
        const { _id } = req.params;
        for (const item of req.files) {
            images.push(req.protocol + "://" + req.get("host") + item.path.slice(17).replaceAll("\\", "/"));
        };
        await foodModel.updateOne({ _id }, { $push: { images } });
        res.status(200).json({ success: true, message: "عکس با موفقیت آپلود شد" });
    } catch (error: any) {
        next({ status: 400, success: false, message: error.message });
    };
};
