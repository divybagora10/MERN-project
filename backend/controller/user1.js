const User = require("../model/user");


exports.signup = async(req,res) => {
    try {
        const {name , email , password , phoneNumber} = req.body;

        const existingUser = await User.findOne({email : email});

        if (existingUser){
            return res.status(401).send({message : "user already exits"});
        }

        const newuser = new User({
            name : name,
            email : email,
            password : password,
            phoneNumber : phoneNumber
        })

        await newuser.save();
        res.send({message : "user created"});
    }
     catch (error) {
        if (error.name === "ValidationError"){
            const errors = Object.values(error.errors).map(err => err.message)
        }
    }
}

exports.login = async (req,res) => {
    try {
        const {email , password} = req.body;

        const existinguser = await User.findOne({email:email});

        if (!existinguser){
            return res.send({message : "User does not exits"});
        }

        const isMatched = password === existinguser.password;

        if (!isMatched){
            return res.send({message : "enter a valid password"})
        }

        res.send({message : "user logged in" , data : existinguser});
    } catch (error) {
        res.send(error);
    }
    
}