"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const passwordSchima = (0, yup_1.object)().shape({
    newPassword: (0, yup_1.string)()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد")
        .required(),
    confirmNewPassword: (0, yup_1.string)().required(),
});
exports.default = passwordSchima;
