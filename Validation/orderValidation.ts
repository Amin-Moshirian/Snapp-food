import { NextFunction, Request, Response } from "express";
import shippingAddressValidaton from "./submitOrderSchema";
import { isValidObjectId } from "mongoose";
import restaurantModel from "../model/restaurantModel";
import foodModel from "../model/foodModel";

declare module 'express-serve-static-core' {
    interface Request {
        order: {
            orderItem: OrderItem;
            shippingAddress: ShippingAddress;
            paymentMethod: string;
            totalPrice: number;
            user: User;
        }
    }
};

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
};


type OrderItem = {
    foodId: {
        name: string;
        description: string;
        rating: number;
        price: number;
    },
    qty: number;
}[];


type ShippingAddress = {
    shippingAddress: {
        name: string;
        address: string;
        postalCode: string;
        city: string;
        phone: number;
    };
};


type Body = {
    orderItem: OrderItem;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
};


type Food = {
    _id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    images: string[];
    deletedCount: number,
    isActive: boolean,
    modifiedCount: number;
};


const orderValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderItem, shippingAddress, paymentMethod }: Body = JSON.parse(JSON.stringify(req.body));
        await shippingAddressValidaton.validate(shippingAddress, { abortEarly: false });
        if (!["online"].includes(paymentMethod)) throw { message: "روش پرداخت فقط به صورت آنلاین میباشد" };
        let totalPrice: number = 0
        for (const item of orderItem) {
            if (!isValidObjectId(item.foodId)) throw { message: "آی دی غذا صحیح نمیباشد" };
            const food: Food | null = await foodModel.findOne({ _id: item.foodId }, { __v: 0, createdAt: 0, updatedAt: 0 });
            if (!food) throw { message: "غذا یافت نشد" };
            item.foodId = food;
            totalPrice += item.qty * food.price;
        };
        totalPrice += 5;
        const orderSubmitData: {
            orderItem: OrderItem;
            shippingAddress: ShippingAddress;
            paymentMethod: string;
            totalPrice: number;
            user: User;
        } = { orderItem, shippingAddress, paymentMethod, totalPrice, user: req.username };
        req.order = orderSubmitData;
        next();
    } catch (error: any) {
        next({ status: 400, message: error.message || error.errors });
    };
};

export default orderValidation;