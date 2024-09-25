const passport = require("passport");
const GoogleStrategy  = require("passport-google-oauth20").Strategy;

const User = require("../model/user");


passport.use(new GoogleStrategy ({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL,
},

async(accessToken , refreshToken ,  profile , done)=>{
    try {
        
        let user = await User.findOne({googleId : profile.id});

        if (user) {
            return done(null,user);
        }

        user = new User ({
            googleId : profile.id,
            name : profile.displayName || "GOOGLE USER",
            email : profile.emails[0].value,
            password : "",
            phoneNumber : "",
            
        })

        await user.save();
        return done(null,user);
    } catch (error) {
        done(error,null)
    }
}
)) 

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById({id});
        done(null,user);
    } catch (error) {
        done(error,null);
    }

})  