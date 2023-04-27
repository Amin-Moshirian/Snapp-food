"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const foodSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().min(2, "نام غذا باید حداقل 2 حرف باشد").required(),
    description: (0, yup_1.string)().min(10, "توضیحات غذا باید حداقل 10 حرف باشد").required(),
    rating: (0, yup_1.number)().min(1, "امیتاز نباید کمتر از 1 باشد").max(5, "امتیاز نباید بیشتر از 5 باشد").required(),
    price: (0, yup_1.number)().min(0, "مقدار قیمت نمیتواند کمتر از 0 باشد").required(),
    isActive: (0, yup_1.boolean)().required(),
});
exports.default = foodSchema;
