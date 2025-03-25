import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect(process.env.DB_URL).then(() => console.log('DB Connected'))
}