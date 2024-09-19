const User = require("../model/user");


exports.signup = async(req,res,next) => {
    try {
        const {name , email , password , contactDetails} = req.body;
        const existingUser = await User.findOne({email : email});

        if (existingUser){
            const error = new Error("User already exits");
            error.name = "user exists"
            error.statusCode = 401

            throw next(error);
        }

        const user = new User ({
            name : name ,
            email : email,
            password : password,
            contactDetails : contactDetails
        })

        await user.save();
        res.send({message : "user created"});
        
    } catch (error) {
        next(error);
    }
    
}

exports.login = async (req,res) => {
    try {
        const {email , password} = req.body;
        const isExisting = await User.findOne({email : email});

        if (!isExisting){
            const error = new Error ("User not found");
            error.name = "notFound";
            error.statusCode = 404;
            throw next(error);
        }

        // const isMatched = password === isExisting.password;
        const isMatched = await bcrypt.compare(password , isExisting.password)

        if (!isMatched){
            const error = new Error("Enter a valid password");
            error.name = "wrongpass";
            error.statusCode = 401;
            throw next(error);
        }

        res.status(200).send({message : "User details" , data : isExisting});
        
    } catch (error) {
        
    }
}