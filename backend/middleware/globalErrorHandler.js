
const errorHandler = (err, req, res , next) =>{
    let statusCode = err.statusCode || 500;
    let errorMessage =  err.message ||"Internal server error";

    if (err.name === "ValidationError"){
        const  message = Object.values(err.errors).map(error=> error.message);
        statusCode = 400;
        errorMessage = message; 
    }

    res.status(statusCode).json({message : err.message})
    // else if (err.name === "userExist"){
    //     statusCode = 400;
    //     errorMessage =err.message;
    // }

    // else if (err.name === "unAuthorized"){
    //     statusCode = 401;
    //     message = "Unauthorized User";
    // }
    // else if (err.name === "NotFound"){
    //     statusCode = 400;
    //     message = "User not found"
    // }
    // res.status(statusCode).json({message : errorMessage});
};


/*
let status code = err.statusCode || 500\
let errorMessage = err.message || "internal server error"

if (err.name === "vlaidationError")
 
 */

module.exports = errorHandler;