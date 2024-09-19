const express = require("express");
const cors = require("cors");
const userRouters = require("./router/user");
const connectDb = require("./config/db")
const globalErrorHandler = require("./middleware/globalErrorHandler")

const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.use("/auth" ,userRouters);

app.use(globalErrorHandler);



app.listen(3000, ()=>{
    console.log("server running on port 3000")
});