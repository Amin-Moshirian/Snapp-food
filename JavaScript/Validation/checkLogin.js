"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../modules/utils");
;
const checkLogin = (req, res, next) => {
    try {
        const user = (0, utils_1.compareToken)(req.headers.authorization.slice(7));
        req.username = user.data;
        next();
    }
    catch (error) {
        next({ status: 401, message: "لطفا وارد حساب کاریری خود شوید" });
    }
};
exports.default = checkLogin;
