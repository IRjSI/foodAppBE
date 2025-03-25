import UserModel from "../models/user.model";

const addToCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const user = await UserModel.findById({
            _id: userId
        });
        const cartData = await user.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await UserModel.findByIdAndUpdate({
            _id: userId
        }, {
            cartData
        })
        res.json({
            status: true,
            message: 'Added to Cart'
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Error adding to cart'
        })
    }
}

const removeFromCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const user = await UserModel.findById({
            _id: userId
        });
        const cartData = await user.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await UserModel.findByIdAndUpdate({
            _id: userId
        }, {
            cartData
        })
        res.json({ 
            status: true, 
            message: "Removed from Cart" 
        })
    } catch (error) {
        console.log(error);
        res.json({ 
            status: true, 
            message: "Error removing from Cart" 
        })
    }
}

const getCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const user = UserModel.findById({
            _id: userId
        })
        const cartData = user.cartData;
        res.json({
            status: true,
            cartData: cartData
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Error getting cart data'
        })
    }
}

export { addToCart, removeFromCart, getCart };