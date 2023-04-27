import { NextFunction, Request, Response } from "express";

type error = {
    status: number;
    success: boolean;
    message: string;
}

export const notFound = (req: Request, res: Response): void => {
    res.status(404).send("Not Found :(");
};

export const errorRes = (error: error, req: Request, res: Response, next: NextFunction): void => {
    const status: number = error.status || 500;
    const message: string | string[] = error.message || "Internal error";
    res.status(status).json({
        status,
        success: false,
        message,
    });
};
