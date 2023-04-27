"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const loginSchima = (0, yup_1.object)().shape({
    firstName: (0, yup_1.string)()
        .min(2, "نام باید حداکثر 2 حرف داشته باشید")
        .required(),
    lastName: (0, yup_1.string)()
        .min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید")
        .required(),
    mobile: (0, yup_1.string)().length(11, "شماره موبایل باید 11 رقم باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل باید با 09 شروع بشود").required()
});
exports.default = loginSchima;
