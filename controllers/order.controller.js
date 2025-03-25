import UserModel from "../models/user.model";
import OrderModel from "../models/order.model";

const placeOrder = async (req,res) => {
    try {
        const { userId, items, amount, address, status, payment } = req.body;
        const newOrder = await OrderModel.create({
            userId,
            items,
            amount,
            address
        })
        // empty cart?
        await UserModel.findByIdAndUpdate({
            _id: userId
        }, {
            cartData: {}
        })
        res.json({
            status: true,
            message: 'Order placed'
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Error placing order'
        })
    }
}

const verifyOrder = async (req,res) => {
    try {
        const { orderId, status } = req.body;
        if (status) {
            await OrderModel.findByIdAndUpdate({
                _id: orderId
            }, {
                payment: true
            })
            res.json({ 
                status: true, 
                message: "Paid" 
            })
        } else {
            await OrderModel.findByIdAndDelete({
                _id: orderId
            })
            res.json({ 
                status: false, 
                message: "Not Paid" 
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ 
            status: false, 
            message: "Error verifying order" 
        })
    }
}

const listOrders = async (req,res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({
            status: true,
            orderList: orders
        })
    } catch (error) {
        console.log(error);
        res.josn({
            status: false,
            message: "Error listing orders"
        })
    }
}

const updateStatus = async (req,res) => {
    try {
        const { orderId, status } = req.body;
        await OrderModel.findByIdAndUpdate({
            _id: orderId
        }, {
            status
        })
        res.json({
            status: true,
            message: "Status updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Error updating satus"
        })
    }
}

const userOrders = async (req,res) => {
    try {
        const { userId } = req.body;
        const orders = await OrderModel.find({
            userId
        })
        res.json({
            status: true,
            userOrders: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Error fetching user orders"
        })
    }
}

export { placeOrder, verifyOrder, listOrders, updateStatus, userOrders };