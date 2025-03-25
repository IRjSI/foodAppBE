import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";

const registerUser = async (req,res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({
            email
        })

        if (existingUser) {
            return res.json({
                status: false,
                message: 'User already exists!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign(newUser._id, process.env.JWT_SECRET)

        res.json({
            status: true,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "register error"
        })
    }
}

const userLogin = async (req,reg) => {
    const { email, password } = req.body;

    try {

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.json({ status: false, message: "User doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({ status: false, message: "Invalid credentials" })
    }

    const token = jwt.sign(user._id, process.env.JWT_SECRET);
    res.json({ status: true, token })

    }

    catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
    }
}

export { registerUser, userLogin };