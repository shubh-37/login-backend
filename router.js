var express = require('express');
var router = express.Router();

const creds = {
    email: 'admin@gmail.com',
    password: 'admin@123'
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == creds.email && req.body.password == creds.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }else{
        res.end("Invalid Username");
    }

});

//router for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }else{
        res.send("Unauthorised User");
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.render('base',{title: 'Express',logout: 'Logout Successful...!'});
        }
    });
});

module.exports = router;