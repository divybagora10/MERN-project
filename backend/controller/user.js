const User = require("../model/user")

exports.signUp =async (req,res) => {
    try {
            // this key comes from frontend
        const {name , email , password ,phoneNumber} = req.body;
        const existingUser = await User.findOne({email : email});

        // if you dont put validator in model you have to do it here the verification work

        if (existingUser){
            return res.status(400).send({message : "user already exits"});
        }

        const newUser = new User ({
            name : name ,
            email : email,
            password : password,
            phoneNumber : phoneNumber,
        });

        await newUser.save();
        res.status(201).send({message : "User created"});

    } catch (err) {
        console.log(err.name)
        if (err.name === "ValidationError"){
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({
                message : "Validation error",
                error : errors
            })
        }

        res.status(500).send(err);
        // res.status(500).send(error);
    }
}

exports.loginUser = async(req,res) => {
    try {
        const {email , password} = req.body;

        const isExitsingUser = await User.findOne({email : email});

        if (!isExitsingUser){
            return res.status(404).send({message : "user does not exist"});
        }

        const isMatced = password === isExitsingUser.password;

        if (!isMatced){
            return res.status(401).send({message  :"enter a correct password"});
        }

        res.status(200).send({message : "user logged in" , data : isExitsingUser});


    } catch (error) {
        res.status(500).send(error);
    }
}
