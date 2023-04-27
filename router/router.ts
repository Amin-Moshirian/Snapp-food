import userRouter from "./user";
import roleRouter from "./role";
import { Request, Response } from "express";
import { errorRes, notFound } from "../modules/errorHandler";
import { Router } from "express";
import rout from "express";
import orderRouter from "./order";
import resRouter from "./restaraunt";
import foodRouter from "./food";
const router: Router = rout.Router();

router.use("/user", userRouter);
router.use("/res", resRouter);
router.use("/food", foodRouter);
router.use("/order", orderRouter);
router.use("/role", roleRouter);
router.get("/",
    (req: Request, res: Response): void => {
        res.send("Server is running");
    });
router.use(notFound);
router.use(errorRes);

export default router;