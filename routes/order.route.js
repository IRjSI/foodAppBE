import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/user-orders', authMiddleware, userOrders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;