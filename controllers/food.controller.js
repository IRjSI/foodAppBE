import FoodModel from "../models/food.model";

const addFood = async (req,res) => {
    try {
        const { name, description, price, category } = req.body;
        await FoodModel.create({
            name,
            description,
            price,
            category
        });
        res.json({
            status: true,
            message: 'Food added'
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Error adding food'
        })
    }
}

const removeFood = async (req,res) => {
    try {
        const { id } = req.body;
        const foodToBeRemoved = await FoodModel.findByIdAndDelete({
            _id: id
        });

        res.json({
            status: true,
            message: 'Food removed'
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Error removing food'
        })
    }
}

const listFood = async (req,res) => {
    try {
        const foods = await FoodModel.find({});
        res.json({
            status: true,
            foodList: foods
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Error listing food"
        })
    }
}

export { addFood, removeFood, listFood };