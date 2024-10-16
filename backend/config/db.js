const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/projectDB")
        // const connection = await mongoose.connect(process.env.MONGODB_URI);
        // const connection = await mongoose.connect("mongodb+srv://divybagora1122:WQ8AykTIXjxusY7m@cluster1.wrxti.mongodb.net/?retryWrites=true&w=majority&ssl=true")
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;