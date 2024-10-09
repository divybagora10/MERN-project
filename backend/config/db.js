const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        const connection = await mongoose.connect("mongodb+srv://divybagora1122:rVF2E9QtTk9lX5lD@mymongodb.jy0ll84.mongodb.net/technoprojectTr1")
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;