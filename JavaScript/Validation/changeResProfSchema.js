"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const changeResProfSchema = (0, yup_1.object)().shape({
    title: (0, yup_1.string)().min(2, "عنوان شهر نباید کمتر از 2 حرف باشد"),
    city: (0, yup_1.string)().min(2, "عنوان کسب و کار نباید کمتر از 2 حرف باشد"),
    shopName: (0, yup_1.string)().min(2, "نام فروشگاه نباید کمتر از 2 حرف باشد"),
    ownerFirstName: (0, yup_1.string)().min(2, "نام باید حداکثر 2 حرف داشته باشید"),
    ownerLastName: (0, yup_1.string)().min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید"),
});
exports.default = changeResProfSchema;
