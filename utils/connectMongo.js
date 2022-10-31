import mongoose from "mongoose"


const connectMongo = () => mongoose.connect(process.env.MONGO_URI);

export default connectMongo