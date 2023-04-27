import { NextFunction, Request, Response } from "express";
import * as fs from "fs";

type File = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

declare module 'express-serve-static-core' {
    interface Request {
        file: File;
    }
}

export const imageValidaton = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const image: File = req.file;
        if (!image) throw { message: "لطفا عکس انتخاب کنید" };
        const type: string = image.mimetype.split("/")[1];
        const size: number = image.size;
        const path: string = image.path.replaceAll("\\", "/");
        if (size > 500 * 1024) {
            fs.unlinkSync(req.file.path);
            throw { status: 400, message: "حجم عکس نباید بیشتر از 2 مگابایت باشد" }
        };
        if (!["jpg", "png", "jpeg", "gif"].includes(type)) {
            throw { status: 400, message: "فرمت عکس معتبر نیست" }
        };
        next();
    } catch (error: any) {
        next({ status: 400, message: error.message })
    };
};

export const imagesValidaton = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const images: any = req.files;
        if (!images) throw { message: "لطفا عکس انتخاب کنید" };
        const error = []
        for (const item of images) {
            const type: string = item.mimetype.split("/")[1];
            const size: number = item.size;
            const help: {
                file: string;
                errors: string[];
            } = { file: item.originalname, errors: [] }
            if (size > 500 * 1024) {
                help.errors.push("حجم عکس نباید بیشتر از 2 مگابایت باشد");
            };
            if (!["jpg", "png", "jpeg", "gif"].includes(type)) {
                help.errors.push("فرمت عکس معتبر نیست");
            };
            if (help.errors.length) {
                error.push(help)
            }
        }
        if (error.length) {
            for (const item of images) {
                fs.unlinkSync(item.path);
            }
            throw error
        }
        next();
    } catch (error: any) {
        next({ status: 400, message: error })
    };
};
