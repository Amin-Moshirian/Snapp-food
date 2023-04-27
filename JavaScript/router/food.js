"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../modules/multer"));
const fileValidation_1 = require("../Validation/fileValidation");
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const foodController_1 = require("../controller/foodController");
const foodRouter = express_1.default.Router();
foodRouter.post("/add-food", checkLogin_1.default, foodController_1.addFood);
foodRouter.post("/upload-foodImage/:_id", checkLogin_1.default, foodController_1.checkFoodId, multer_1.default.array("food-Images", 10), fileValidation_1.imagesValidaton, foodController_1.saveImages);
foodRouter.put("/edit-food/:_id", checkLogin_1.default, foodController_1.editFood);
foodRouter.get("/search", foodController_1.searchFood);
foodRouter.delete("/delete-food/:_id", checkLogin_1.default, foodController_1.deleteFood);
foodRouter.get("/:id", checkLogin_1.default, foodController_1.getOneFood);
foodRouter.get("/", checkLogin_1.default, foodController_1.getFoods);
exports.default = foodRouter;
