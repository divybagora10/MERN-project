const mongoose = require("mongoose");
const validator = require("validator");

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

                return validator.isAlpha(value , "en-US");
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

})

module.exports = mongoose.model("User" , userSchema);