import { Router } from "express";
import order from "express"
import checkLogin from "../Validation/checkLogin";
import orderValidation from "../Validation/orderValidation";
import { getOneOrder, getOrders, submitOrder } from "../controller/orderController";
const orderRouter: Router = order.Router();

orderRouter.post("/submit", checkLogin, orderValidation, submitOrder)
orderRouter.get("/:_id", checkLogin, getOneOrder)
orderRouter.get("/", checkLogin, getOrders)

export default orderRouter;