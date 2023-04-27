import { NextFunction, Request, Response } from "express";
import userModel from "../model/userModel";
import restaurantModel from "../model/restaurantModel";


export const setAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        const { Role }: { Role: string } = req.body;
        const user: { Role: string } = await userModel.findOne({ _id });
        const rest: { Role: string } = await restaurantModel.findOne({ _id });
        if (user?.Role === "Owner" || rest?.Role === "Owner") throw { message: "شما نمیتوانید نقش این کاربر را تغییر دهید" };
        if (!["Admin", "Restaurant", "User"].includes(Role)) throw { message: "نقش تعیین شده صحیح نمیباشد" };
        await userModel.updateOne({ _id }, { Role });
        await restaurantModel.updateOne({ _id }, { Role });
        res.status(200).json({ status: 200, success: true, message: "نقش با موفقیت تنظیم شد" });
    } catch (error: unknown) {
        next(error);
    };
};


export const setRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        const { Role } = req.body;
        const user: { Role: string } = await userModel.findOne({ _id });
        const rest: { Role: string } = await restaurantModel.findOne({ _id });
        if (user?.Role === "Owner" || rest?.Role === "Owner" || user?.Role === "Admin" || rest?.Role === "Admin") throw { message: "شما نمیتوانید نقش این کاربر را تغییر دهید" };
        if (!["Restaurant", "User"].includes(Role)) throw { message: "نقش تعیین شده صحیح نمیباشد" };
        await userModel.updateOne({ _id }, { Role });
        await restaurantModel.updateOne({ _id }, { Role });
        res.status(200).json({ status: 200, success: true, message: "نقش با موفقیت تنظیم شد" });
    } catch (error: unknown) {
        next(error);
    };
};
