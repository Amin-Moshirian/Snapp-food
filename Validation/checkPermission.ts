import { NextFunction, Request, Response } from "express";
import userModel from "../model/userModel";
import restaurantModel from "../model/restaurantModel";

type User = {
    Role: string;
};

export const isOwnerAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = await userModel.findOne({ mobile: req.username });
        const res: User = await restaurantModel.findOne({ mobile: req.username });
        if (!["Admin", "Owner"].includes(user?.Role) && !["Admin", "Owner"].includes(res?.Role)) throw { status: 403, success: false, message: "شما مجاز به انجام چنین عملیاتی نیستید" };
        next();
    } catch (error: unknown) {
        next(error)
    }
};

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = await userModel.findOne({ mobile: req.username });
        const res: User = await restaurantModel.findOne({ mobile: req.username });
        if (user?.Role != "Owner" && res?.Role != "Owner") throw { status: 403, success: false, message: "شما مجاز به انجام چنین عملیاتی نیستید" };
        next();
    } catch (error: unknown) {
        next(error)
    }
};