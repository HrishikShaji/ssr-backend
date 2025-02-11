
import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";

export const connectDB = async () => {
	try {

		const conn = await mongoose.connect(MONGO_URI)
		console.log(`MongoDB connected : ${conn.connection.host}`)
	} catch (error: any) {
		console.log("Error connection to MongoDB:", error.message)
		process.exit(1)
	}
}
