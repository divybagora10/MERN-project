const passport = require("passport"); // work as a middleware to authenticate the credentials from google emailID
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");

passport.use(new GoogleStrategy ({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL
},
async(accessToken , refreshToken , profile , done) =>{
    // console.log(profile);
    try {
        let user = await User.findOne ({googleId : profile.id});
        if (user){
            return done(null,user);
        }

        user  = new User({
            googleId : profile.id,
            name : profile.displayName || "Google User",
            email : profile.emails[0].value,
            password : "",
            phoneNumber : "",
            lastVisited :[],
        })

        await user.save();
        done(null , user);
        
    } catch (error) {
        done(error,false);
    }
}
))

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser(async(id,done)=>{
   try {
        const user = await User.findById(id);
        done (null,user);
   } catch (error) {
        done(error,null);
   }
})