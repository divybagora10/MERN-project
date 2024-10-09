const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        // const connection = await mongoose.connect("mongodb://localhost:27017/projectDB")
        const connection = await mongoose.connect("mongodb+srv://divybagora1122:WQ8AykTIXjxusY7m@cluster1.wrxti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;