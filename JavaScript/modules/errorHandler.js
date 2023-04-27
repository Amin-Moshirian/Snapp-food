"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRes = exports.notFound = void 0;
const notFound = (req, res) => {
    res.status(404).send("Not Found :(");
};
exports.notFound = notFound;
const errorRes = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal error";
    res.status(status).json({
        status,
        success: false,
        message,
    });
};
exports.errorRes = errorRes;
