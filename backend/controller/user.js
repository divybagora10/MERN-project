const User = require("../model/user")
const bcrypt = require("bcrypt");
const { query } = require("express");
const jwt = require("jsonwebtoken");



exports.signUp =async (req,res,next) => {
    try {
            // this key comes from frontend
        const {name , email , password ,phoneNumber,role} = req.body;
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
            role : role,
            lastVisited :[],
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

        const isExistingUser = await User.findOne({email : email});

        if (!isExistingUser){
            const error = new Error ("User not found");
            error.name = "Notfound";
            // console.log(error);
            error.statusCode = 404;
              throw next(error);
            // return res.status(404).send({message : "user does not exist"});
        }

        const isMatched = await bcrypt.compare(password , isExistingUser.password);
        // console.log(isMatced);
        // console.log(isExitsingUser.password)
        // const isMatched = await bcrypt.compare(password === isExitsingUser.password)
        // console.log(isMatched);

        if (!isMatched){
            const error = new Error("UnAuthorized user");
            error.name = "Unauthorized";
            error.statusCode = 401;
            throw next(error);
            // return res.status(401).send({message  :"enter a correct password"});
        }

        await User.findOneAndUpdate({email : email}, {$push : {lastVisited : new Date().toLocaleString()}})

        const token = jwt.sign({id : isExistingUser.id , email : isExistingUser.email ,role : isExistingUser.role} , process.env.JWT_SECRET , {expiresIn : "1h"});
       
        res.cookie("token" , token , {
            httpOnly : true,
            secure : false
        });

        res.status(200).send({message : "user logged in" , data : isExistingUser, token : token });
        // res.redirect("https://www.instagram.com");


    } catch (error) {
        // res.status(500).send(error);
        next(error);
    }
}



exports.getAllUsers = async (req,res,next) =>{
    try {
        const users = await User.find({});
        res.status(200).send({message : "Users fetched" , data : users});
    } catch (error) {
        next(error);
    }
}



exports.updateUser = async(req,res,next)=>{
    try {
        // const email = req.params.email;
        console.log("Update Api")
        const {email} = req.body;
        const {password} = req.body;
        const isExistingUser = await User.findOne({email});

        if (!isExistingUser){
            const error = new Error("User does not exits");
            error.name = "Notfound";
            error.statusCode = 404;
            throw error;
        }
        
        if (isExistingUser.password !== password){

            const hashedPassword = await bcrypt.hash(password , 12);
            req.body = {...req.body , password : hashedPassword};
        }
        // req.body = {...req.body , email : updatedEmail};

        const updatedUser = await User.findOneAndUpdate({email} ,req.body,{new : true});  

        res.status(200).send({message : "User update successfully" , data : updatedUser});
    } catch (error) {
        next(error);
    }
}
