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
        

        const {id} = req.params;
        console.log("delete api")
        // console.log(name);
        const deletedProduct = await product.findOneAndDelete({_id : id});

        if (deletedProduct){
            res.status(200).send({message : "product deleted" ,data : deletedProduct});
        }
        // res.send({message : "Product deletes", products : deletedProduct});
        
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req,res,next) =>{
    console.log("update")
    const id = req.params.id;
    console.log(id)
    console.log(req.body)
    try {

        const isExisting = await product.findById(id);
        if (!isExisting){
            const error = new Error("Product not found");
            error.name = "not found";
            error.statusCode = 404;
            throw error;
       }

        const updateProduct = await product.findByIdAndUpdate(id , req.body , {new : true})
        res.status(200).send({message : "Product details updated", data : updateProduct});
        // console.log(id);
        // const isExistingProduct = await product.findById(id);
        // console.log(isExistingProduct)

        // if(!isExistingProduct){
        //     const error = new Error("product not found");
        //     error.name = "Not found",
        //     error.statusCode(404)
        //     throw error;
        // }

        // const updatedProduct = await product.findByIdAndUpdate(id ,req.body,{new : true}); 
    } catch (error) {
        next(error);
    }
}


exports.updateProductWithImage = async (req,res,next) =>{

    console.log("In update image API")
    const id = req.params.id;
    const productUrl = req.file.path;
    const reqBody = { ...req.body , productURL : productUrl }
    
    try {

        const isExisting = await product.findById(id);
        if (!isExisting){
            const error = new Error("Product not found");
            error.name = "not found";
            error.statusCode = 404;
            throw error;
       }

        const updateProduct = await product.findByIdAndUpdate(id , reqBody , {new : true})
        res.status(200).send({message : "Product details updated", data : updateProduct});
    }catch(error){

    }
}
