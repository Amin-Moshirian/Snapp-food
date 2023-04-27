"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const changeProfileSchema = (0, yup_1.object)().shape({
    firstName: (0, yup_1.string)()
        .min(2, "نام باید حداکثر 2 حرف داشته باشید"),
    lastName: (0, yup_1.string)()
        .min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید"),
    email: (0, yup_1.string)().email()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "ایمیل صحیح نمیباشد")
});
exports.default = changeProfileSchema;
