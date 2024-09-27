// const express = require("express");

const product = require("../model/product");

exports.getAllProduct = async(req,res,next)=>{
    try {
        const products = await product.find();
        res.status(200).send({message : "Products fetched" , data : products});
    } catch (error) {
        next(error);
    }
}


exports.createProduct = async (req,res,next)=>{
    console.log("api called")
    const {name , price , description , category } = req.body; 
    const productURL =  req.file.path;
    console.log(productURL)
    try {
        const newProduct = new product({name,price,description,category , productURL});

        await newProduct.save();
        res.status(201).send({message : "Product added", data : newProduct});

    } catch (error) {
        next(error);
    }
}


exports.deleteProduct = async (req,res,next)=>{
    try {
        const {name} = req.body;
        const deletedProduct = await product.findOneAndDelete({name : name});

        if (deletedProduct){
            res.status(200).send({message : "product deleted"});
        }
        
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req,res,next) =>{

    try {
        const id = req.params.id;
        const isExistingProduct = await product.findById(id);

        if(!isExistingProduct){
            const error = new Error("product not found");
            error.name = "Not found",
            error.statusCode(404)
            throw error;
        }

        const updatedProduct = await product.findByIdAndUpdate(id ,req.body,{new : true}); 
    } catch (error) {
        next(error);
    }
}
