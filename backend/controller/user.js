const User = require("../model/user")
const bcrypt = require("bcrypt");

exports.signUp =async (req,res,next) => {
    try {
            // this key comes from frontend
        const {name , email , password ,phoneNumber} = req.body;
        const existingUser = await User.findOne({email : email});
        const existingConatct = await User.findOne({phoneNumber : phoneNumber})
        // if you dont put validator in model you have to do it here the verification work

        if (existingUser){
            const error = new Error("user already exits");
            error.name = "userExist";
            error.statusCode = 400;
            throw next(error);
            // return res.status(400).send({message : "user already exits"});
        }

         if(existingConatct){
            const error = new Error ("Number already used");
            error.name = "same number";
            error.statusCode = 401
            throw next(error);
        }

        // const hashedPassword = await bcrypt.hash(password, 12); // use this to encrypt the password
        // do this step in save middleware 


        const newUser = new User ({
            name : name ,
            email : email,
            password : password,
            phoneNumber : phoneNumber,
        }); // data goes to schema and validate the condition or give the error
            // this will throw ValidationError


        await newUser.save();
        res.status(201).send({message : "User created"});

    } catch (err) {
        next(err);
        // console.log(err.name)
        // if (err.name === "ValidationError"){
        //     const e = Object.values(err.errors).map(error => error.message);
        //     console.log(err.errors)
        //     return res.status(400).json({
        //         message : "Validation error",
        //         error : e
        //     })
        // }

        // res.status(500).send(err);
        // res.status(500).send(error);
    }
}

exports.loginUser = async(req,res,next) => {
    try {
        const {email , password} = req.body;

        const isExitsingUser = await User.findOne({email : email});

        if (!isExitsingUser){
            const error = new Error ("User not found");
            error.name = "Notfound";
            error.statusCode = 404;
            throw next(error);
            // return res.status(404).send({message : "user does not exist"});
        }

        // const isMatced = await bcrypt.compare(password , isExitsingUser.password);
        // console.log(isMatced);
        const isMatched = password === isExitsingUser.password

        if (!isMatched){
            const error = new Error("UnAuthorized ");
            error.name = "Unauthorized";
            error.statusCode = 401;
            throw next(error);
            // return res.status(401).send({message  :"enter a correct password"});
        }

        res.status(200).send({message : "user logged in" , data : isExitsingUser});


    } catch (error) {
        // res.status(500).send(error);
        next(error);
    }
}
