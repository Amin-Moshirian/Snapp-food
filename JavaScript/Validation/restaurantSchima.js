"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const restaurantSchima = (0, yup_1.object)().shape({
    title: (0, yup_1.string)().min(2, "عنوان شهر نباید کمتر از 2 حرف باشد").required(),
    city: (0, yup_1.string)().min(2, "عنوان کسب و کار نباید کمتر از 2 حرف باشد").required(),
    mobile: (0, yup_1.string)().length(11, "شماره موبایل باید 11 رقم باشد و با 09 شروع شده باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required(),
    shopName: (0, yup_1.string)().min(2, "نام فروشگاه نباید کمتر از 2 حرف باشد").required(),
    ownerFirstName: (0, yup_1.string)().min(2, "نام باید حداکثر 2 حرف داشته باشید").required(),
    ownerLastName: (0, yup_1.string)().min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید").required()
});
exports.default = restaurantSchima;
