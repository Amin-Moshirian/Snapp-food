import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";
import * as fs from "fs"
dotenv.config({ path: './.env' });

export const hashString = (str: string): string => {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
};

export const compareHashedString = (data: string, hashedString: string): boolean => {
    return bcrypt.compareSync(data, hashedString);
};

export const generateToken = (payLoad: string): string => {
    return jwt.sign({ data: payLoad }, process.env.SECRET_KEY as string, { expiresIn: "1d" });
};

export const compareToken = (payLoad: string): string | jwt.JwtPayload => {
    return jwt.verify(payLoad, process.env.SECRET_KEY as string);
};

export const uploadFilePath = (): string => {
    const year: number = new Date().getFullYear();
    const month: number = new Date().getMonth() + 1;
    const day: number = new Date().getDate();
    const fileAddress: string = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "images",
        String(year),
        String(month + 1),
        String(day)
    );
    fs.mkdirSync(fileAddress, { recursive: true });
    return path.join(
        "JavaScript",
        "public",
        "uploads",
        "images",
        String(year),
        String(month + 1),
        String(day)
    );
};