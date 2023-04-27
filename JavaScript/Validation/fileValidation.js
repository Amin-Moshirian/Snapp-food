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
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesValidaton = exports.imageValidaton = void 0;
const fs = __importStar(require("fs"));
const imageValidaton = (req, res, next) => {
    try {
        const image = req.file;
        if (!image)
            throw { message: "لطفا عکس انتخاب کنید" };
        const type = image.mimetype.split("/")[1];
        const size = image.size;
        const path = image.path.replaceAll("\\", "/");
        if (size > 500 * 1024) {
            fs.unlinkSync(req.file.path);
            throw { status: 400, message: "حجم عکس نباید بیشتر از 2 مگابایت باشد" };
        }
        ;
        if (!["jpg", "png", "jpeg", "gif"].includes(type)) {
            throw { status: 400, message: "فرمت عکس معتبر نیست" };
        }
        ;
        next();
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
    ;
};
exports.imageValidaton = imageValidaton;
const imagesValidaton = (req, res, next) => {
    try {
        const images = req.files;
        if (!images)
            throw { message: "لطفا عکس انتخاب کنید" };
        const error = [];
        for (const item of images) {
            const type = item.mimetype.split("/")[1];
            const size = item.size;
            const help = { file: item.originalname, errors: [] };
            if (size > 500 * 1024) {
                help.errors.push("حجم عکس نباید بیشتر از 2 مگابایت باشد");
            }
            ;
            if (!["jpg", "png", "jpeg", "gif"].includes(type)) {
                help.errors.push("فرمت عکس معتبر نیست");
            }
            ;
            if (help.errors.length) {
                error.push(help);
            }
        }
        if (error.length) {
            for (const item of images) {
                fs.unlinkSync(item.path);
            }
            throw error;
        }
        next();
    }
    catch (error) {
        next({ status: 400, message: error });
    }
    ;
};
exports.imagesValidaton = imagesValidaton;
