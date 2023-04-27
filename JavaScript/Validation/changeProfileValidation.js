"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const changeProfileValidation = (0, yup_1.object)().shape({
    firstName: (0, yup_1.string)()
        .min(2, "نام باید حداکثر 2 حرف داشته باشید"),
    lastName: (0, yup_1.string)()
        .min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید"),
    password: (0, yup_1.string)()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد")
});
exports.default = changeProfileValidation;
