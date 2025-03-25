import express from "express";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);

export default userRouter;