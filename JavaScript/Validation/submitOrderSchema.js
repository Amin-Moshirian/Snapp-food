"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const shippingAddressValidaton = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().min(2, "نام وارد شده باید حداقل 2 حرف داشته باشد"),
    address: (0, yup_1.string)().min(10, "آدرس وارد شده باید حداقل 10 حرف داشته باشد").required(),
    postalCode: (0, yup_1.string)().length(10, "کد پستی باید دقیقا 10 رقم باشد").required(),
    city: (0, yup_1.string)().min(2, "شهر باید 2 حرف داشته باشد").required(),
    phone: (0, yup_1.string)()
        .length(11, "شماره همراه باید دقیقا 11 رقم باشد")
        .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل وارد شده باید با 09 شروع شود")
        .required("شماره موبایل باید وارد شود"),
});
exports.default = shippingAddressValidaton;
