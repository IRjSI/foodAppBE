import express from "express";
import { addFood, removeFood, listFood } from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.post('/add', addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;