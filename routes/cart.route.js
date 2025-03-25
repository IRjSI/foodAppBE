import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cart.controller";
import authMiddleware from "../middleware/authMiddleware"

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/get', authMiddleware, getCart);

export default cartRouter;