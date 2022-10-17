const path = require('path');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const {Strategy} = require('passport-google-oauth20');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 8000;
const config = {
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    callbackURL:'/auth/google/callback',
    clientID:config.CLIENT_ID,
    clientSecret:config.CLIENT_SECRET,
}
//--------------------------------------------
function verifyCallBack(accessToken,refreshToken,profile,done){
    console.log('Google Profile:',profile);
    done(null,profile)
}

//---------------------------------
passport.use(new Strategy(AUTH_OPTIONS,verifyCallBack))
app.use(helmet());
app.use(passport.initialize());
//---------------------------------------

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.get('/auth/google',
    passport.authenticate('google',{scope:['email']})
);
app.get('/auth/logout',()=>{});
app.get('/auth/google/callback',
    passport.authenticate('google',{
        failureRedirect:'/failure',
        successRedirect:'/',
        session:false,
    })
);
app.get('/failure');
app.get('/secret',(req,res)=>{
    res.send('Your secret is 42!');
})
//-----------------------------------------------------------


app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`);
})