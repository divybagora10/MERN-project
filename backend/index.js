const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRouters = require("./router/user");
const connectDb = require("./config/db");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const productRoutes = require("./router/product");
const path = require("path");
const Order = require("./model/order");
const NodeCache = require("node-cache");

// -- for google auth
const authRoutes = require("./router/auth");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./config/passport");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) 

const app = express();

app.use(session ({
    secret : "Your_Secret_Key",
    resave : false,
    saveUninitialized : false,
    cookie : {secure : false}

}))

// const clientId   we dont write clientId directly it can be compromised
app.use(cookieParser());    
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

connectDb();

app.use("/uploads",express.static(path.join(__dirname , "uploads")));

app.use("/auth" ,userRouters);
app.use("/api/auth",authRoutes);
app.use("/api" , productRoutes);
app.get('/' , (req,res)=>{
    res.send("hello divy");
})


app.post('/create-checkout-session' ,async(req,res)=>{
    const { products , userId , customerName , customerContactNumber , address , pinCode}  = req.body;
    console.log("payment gatway")
    const lineItems = products.map((item)=>({
        price_data: {
            currency : "inr",
            product_data : {
                name : item.name,

            },
            unit_amount : item.price * 100

        },
        quantity : 1
    }
    ))

    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items : lineItems,
        mode : "payment",
        success_url : "http://localhost:5173/paymentsuccess",
        cancel_url : "http://localhost:5173/cancelPayment"
    });

    const order = new Order({
        product : products , userId , customerName , customerContactNumber , address , pinCode : +pinCode , transactionId : session.id
    });

    await order.save();

    res.json({id : session.id});
})



app.use(globalErrorHandler);




app.listen(3000, ()=>{
    console.log("server running on port 3000")
});