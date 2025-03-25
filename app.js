import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4001

connectDB();

app.use(express.json());
app.use(cors())

app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/food', foodRouter);

app.listen(PORT);