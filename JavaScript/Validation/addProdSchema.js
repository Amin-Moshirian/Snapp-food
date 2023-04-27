"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const addProdSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().min(3).required(),
    description: (0, yup_1.string)().min(10).required(),
    rating: (0, yup_1.number)().min(1).max(5).required(),
    price: (0, yup_1.number)().min(0).required(),
});
exports.default = addProdSchema;
