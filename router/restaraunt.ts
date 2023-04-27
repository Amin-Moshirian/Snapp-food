import { Router } from "express";
import rest from "express"
import upload from "../modules/multer";
import { imageValidaton } from "../Validation/fileValidation";
import checkLogin from "../Validation/checkLogin";
import { restaurantSignUp, changeResProfile, resLogin, generateResPassword, changeResPassword, deleteResAccout, getResProfile, saveResImage, resLogOut, getResOtp, checkResOtp, getOneRest, getRests } from "../controller/restaurantController";
const resRouter: Router = rest.Router();

resRouter.post("/signup", restaurantSignUp);
resRouter.post("/login", resLogin);
resRouter.put("/change-profile", checkLogin, changeResProfile);
resRouter.put("/logout", checkLogin, resLogOut);
resRouter.put("/generate-password", checkLogin, generateResPassword);
resRouter.put("/change-password", checkLogin, changeResPassword);
resRouter.delete("/delete-account", checkLogin, deleteResAccout);
resRouter.get("/get-profile", checkLogin, getResProfile);
resRouter.post("/upload-avatar", checkLogin, upload.single('avatar'), imageValidaton, saveResImage);
resRouter.get("/get-otp", getResOtp);
resRouter.post("/check-otp", checkResOtp);
resRouter.get("/:id", checkLogin, getOneRest);
resRouter.get("/", checkLogin, getRests);

export default resRouter;