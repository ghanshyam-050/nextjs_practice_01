import mongoose from "mongoose";

export async function connectDB(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("mongodb connection success fully")
        })

        connection.on('error', () => {
            console.log("mongodb connection error up and error")
            process.exit();
        })

    } catch (error) {
        console.log("mongo db connection error")
        console.log(error);
        process.exit()
    }
}