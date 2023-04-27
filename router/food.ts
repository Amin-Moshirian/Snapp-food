import { Router } from "express";
import food from "express"
import upload from "../modules/multer";
import { imagesValidaton } from "../Validation/fileValidation";
import checkLogin from "../Validation/checkLogin";
import { addFood, checkFoodId, deleteFood, editFood, getFoods, getOneFood, saveImages, searchFood } from "../controller/foodController";
const foodRouter: Router = food.Router();


foodRouter.post("/add-food", checkLogin, addFood);
foodRouter.post("/upload-foodImage/:_id", checkLogin, checkFoodId, upload.array("food-Images", 10), imagesValidaton, saveImages);
foodRouter.put("/edit-food/:_id", checkLogin, editFood);
foodRouter.get("/search", searchFood);
foodRouter.delete("/delete-food/:_id", checkLogin, deleteFood);
foodRouter.get("/:id", checkLogin, getOneFood);
foodRouter.get("/", checkLogin, getFoods);


export default foodRouter;