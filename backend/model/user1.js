const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name is required"],
        minlength : [3 , "name should be greater than 3 words"],
        maxlength : [30 , "name exceed the max length"],
        validate : {
            validator : function (value) {
                return validator.isAlpha(value ,"en-US");
            },
            message : "name should be in string"
        }
    },

    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value);
            },
            message:"enter a valid email"
        }
    },


    password : {
        type : String,
        required : [true , "Password required"],
        minlength : [8 , "minimum length of password should be 8"],
        maxlength: [20, "max length of password can be only 20"],

        validate : {
            validator : function (value){
                return validator.isStrongPassword(value , {
                   minlength : 8,
                   minLowercase : 1,
                   minUppercase : 1,
                   minNumbers : 1,
                   minSysmbols : 8,
                })
            },
            message : "please enter a valid password"
        }
    }
})

userSchema.pre("save" , async function (next) {
    try {   
        const user = this;

        if (user.isModified(user.password)){
            return next();
        }

        const hashedPassword = await bcrypt.hash(user.password , 12);

        this.password = hashedPassword;
        console.log(this.password);
        next();
        
    } catch (error) {
        
    }
})