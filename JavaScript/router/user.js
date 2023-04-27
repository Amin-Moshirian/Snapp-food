"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controller/userController");
const fileValidation_1 = require("../Validation/fileValidation");
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const multer_1 = __importDefault(require("../modules/multer"));
const express_1 = __importDefault(require("express"));
const checkPermission_1 = require("../Validation/checkPermission");
const userRouter = express_1.default.Router();
userRouter.post("/signup", userController_1.userSignUp);
userRouter.post("/login", userController_1.login);
userRouter.put("/logout", checkLogin_1.default, userController_1.logOut);
userRouter.put("/change-profile", checkLogin_1.default, userController_1.changeProfile);
userRouter.put("/generate-password", checkLogin_1.default, userController_1.generatePassword);
userRouter.put("/change-password", checkLogin_1.default, userController_1.changePassword);
userRouter.delete("/delete-account", checkLogin_1.default, userController_1.deleteAccout);
userRouter.get("/get-profile", checkLogin_1.default, userController_1.getProfile);
userRouter.post("/upload-avatar", checkLogin_1.default, multer_1.default.single('avatar'), fileValidation_1.imageValidaton, userController_1.saveImage);
userRouter.get("/get-otp", userController_1.getOtp);
userRouter.post("/check-otp", userController_1.checkOtp);
userRouter.post("/leave-comment", checkLogin_1.default, userController_1.leaveComment);
userRouter.get("/:id", checkLogin_1.default, checkPermission_1.isOwnerAdmin, userController_1.getUser);
userRouter.get("/", checkLogin_1.default, checkPermission_1.isOwnerAdmin, userController_1.getUsers);
exports.default = userRouter;
