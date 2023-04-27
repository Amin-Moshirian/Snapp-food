import { Router } from "express";
import role from "express"
import { setAdmin, setRole } from "../controller/roleController";
import checkLogin from "../Validation/checkLogin";
import { isOwner, isOwnerAdmin } from "../Validation/checkPermission";

const roleRouter: Router = role.Router();

roleRouter.put("/set-role/:_id", checkLogin, isOwnerAdmin, setRole);
roleRouter.put("/set-admin/:_id", checkLogin, isOwner, setAdmin)


export default roleRouter;