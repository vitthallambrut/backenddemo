const express = require('express');
const router = express.Router();
// const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send("hello vitthal");
});

router.post('/register', async (req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({ error : "Please filled the field properly"})
    }
    try{
        const UserExist= await User.findOne({email:email});

        if(UserExist){
            return res.status(422).json({error:"Email already exist"});
        } else if(password !== cpassword){
            return res.status(422).json({error:"password are not matching"})
        }else{
            const user = new User({name, email, phone, work, password, cpassword});

        
            await user.save();
            
            res.status(201).json({ message : "user registered successfully" });
        }
       

    } catch(err) {
        console.log(err)
    }
    
})

router.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please filled the field properly"})
        }

        const userLogin = await User.findOne({email:email});

        // if(userLogin){
        //     const isMatch = await bcrypt.compare(password, userLogin.password);
        const token =  await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true
        })

        // if(!isMatch){
        //     res.json({error : "Invalid credential"});
        // }else{
        //     res.json({message : "user signin successfully"});
        // }
        // } else{
        //     res.json({error : "Invalid credential"});
        // }
        
    } catch(err) {
        console.log(err);
    }
})



module.exports = router;
