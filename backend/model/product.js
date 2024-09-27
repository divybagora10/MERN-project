const mongoose = require("mongoose");
const validator = require ("validator");

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Product name is required"],  
        min : [3 , "Product name must be atleast 3 letters"],

    },

    price : {
        type : Number,
        required :[true, "Price is required"],
        min : [0, "price should be greater than 0"]
    },

    description : {
        type : String,
        required : [true , "Product description is required"],
        min : [10 , "Description should be atleast 10 words"]
    },

    category : {
        type  :String,
        required : [true , "Category is required"]
    },

    productURL : {
        type : String,
        // validate : {
        //     validator  : function(value){
        //         return validator.isURL(value)
        //     },

        //     message : "Please provide a valid URL"
        // },

        required : [true , "product url is required"]
    }

});

module.exports = mongoose.model("product",productSchema);