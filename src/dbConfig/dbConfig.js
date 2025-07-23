import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
            const conn = mongoose.connection;
            conn.on('Connected',() => {
                console.log("MongoDb connected sucessfully");
            })
            conn.on("error",(e) => {
                console.log("MongoDb connection error" + e);
                process.exit();
            })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}