const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name is required"],
        minlength : [3 , "Name must be 3 character long"],
        maxlength : [50 , "Name length exceed 50 characters"],
        validate : {
            validator : function(value){
                // if (typeof value !== "string"){
                //     return false;
                // } // this method is not working 

                return validator.isAlpha(value , "en-US",{ignore: " "});
            },
            message : "Name should be in string"
        }

        // validate : {
        //     validator : function(value) {

        //     }
        // }
    },

    email :{
        type : String,
        required :[true, "Email is required"],
        unique : true,
        validate : {
            validator  : function(value) {
                return validator.isEmail(value);
            },

            message : "Enter the valid email"
        }
    },

    password : {
        type : String,
        required : [true , "Password is required"],
        minlength :[8,"password must be of 8 characters"],
        maxlength : [128 ,"password cannot exceed 128 characters"],
        validate : {
            validator : function(value) {
                return validator.isStrongPassword(value ,{
                    minLength : 8,
                    minLowercase : 1,
                    minUppercase :1,
                    minNumbers : 1,
                    minSymbols : 1
                })
            },
            message : "Password must contain one small , one capital , one special , one numeric values"
        }

    },

    phoneNumber : {
        type : String,
        required : [true , "Phone number is required"],
        validate : {
            validator : function (value){
                return validator.isMobilePhone(value , "en-IN");
            },
            message : "Please enter a valid phone number"
        }

    },
    role : {
        type : String,
        required : [true , "Role is required"],
        enum : ["User" , "Admin"], // role does not take values other than enum 
        default : "User",
    },
    status : {
        type : Boolean,
        required : [true, "Status is required"],
        enum : [true,false],
        default : true
    }

})

userSchema.pre("save",async function(next){
    // doubt the parameter accepted by function is what

    try {
        const user  = this;

        if (!user.isModified ("password")){
            return next();
        } 

        const hashedPassword = await bcrypt.hash(user.password,12);
        // 12 is for encrytion level
    
        console.log(this);
        this.password = hashedPassword;
        // console.log("before saving the document and after the validation");
        console.log(this)
        next();
    } 
    catch (error) {
        next(error);
    }
   
})

module.exports = mongoose.model("User" , userSchema);