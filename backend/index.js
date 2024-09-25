const express = require("express");
const cors = require("cors");
const userRouters = require("./router/user");
const connectDb = require("./config/db");
const globalErrorHandler = require("./middleware/globalErrorHandler");


// -- for google auth
const authRoutes = require("./router/auth");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./config/passport");

const app = express();

app.use(session ({
    secret : "Your_Secret_Key",
    resave : false,
    saveUninitialized : false,
    cookie : {secure : false}

}))

// const clientId   we dont write clientId directly it can be compromised

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

connectDb();

app.use("/auth" ,userRouters);
app.use("/api/auth",authRoutes);

app.use(globalErrorHandler);



app.listen(3000, ()=>{
    console.log("server running on port 3000")
});