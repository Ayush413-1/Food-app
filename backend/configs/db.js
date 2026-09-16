import mongoose from 'mongoose'
import 'dotenv/config.js';

const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', () => console.log("Database Connected")
    );
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    }catch(error){
        // Database connection errors can be handled by the caller or logging layer.
    }
}

export default connectDB;