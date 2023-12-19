const express = require('express');
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const jwtSecret = "HaHa"


router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            // password: req.body.password,  first write this and then use bcryptjs
            password: securePass,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mr.shivanggupta@gmail.com',
          pass: 'qutjvmkevdkmjjkl',
        },
      });
    const templateSource = fs.readFileSync('./Routes/index.html', 'utf8');
    const template = handlebars.compile(templateSource);
    const datas = {
      userEmail: req.body.email,
      userName: req.body.name,
      password: req.body.password,
    };

    const html = template(datas);

    const email = {
      from: 'mr.shivanggupta@gmail.com',
      to: datas.userEmail,
      subject: 'Food Delivery',
      html: html,
    };
    transporter.sendMail(email, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    
})

// router.post("/createuser",  [
//     body('email').isEmail(),
//     body('password').isLength({ min: 5 }),
//     body('name').isLength({ min: 3 })
// ], async(req,res)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const salt = await bcrypt.genSalt(10);
//     let securePasswrd = await bcrypt.hash(req.body.password,salt); 
//     try{
//       await User.create({
//             // name: "syam Das",
//             // password: "12125653",
//             // email : "qwasdfghet@gmail.com",
//             // location : "Durg"
//             name:req.body.name,
//             password:securePasswrd,
//             email:req.body.email,
//             location:req.body.location
//         }).then( user => {
//             const data = {
//                 user: {
//                     id: user._id
//                 }
//             }
//             console.log(data);
//             const authToken = jwt.sign(data, jwtSecret)
//             // console.log(authToken)
//             success = true
//             res.json({ success, authToken })
//         })
//         .catch(err => {
//             console.log(err);
//             res.json({ error: "Please enter a unique value." })
//         })
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false});
//     }
// })

// router.post("/loginuser", [
//     body('email').isEmail(),
//     body('password').isLength({ min: 5 }),
// ],async(req,res)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     let email = req.body.email;
//     try{
//        let userData = await User.findOne({ email });
//        if(!userData){
//         return res.status(400).json({ errors: "Invalid Credentials Email" });
//        }

//        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
//        if(!pwdCompare){
//         return res.status(400).json({ errors: "Invalid Credentials Passord" });
//        }
//           // console.log("succes");
//           const data = {
//             user:{
//                 id:userData._id
//             }
//           }
//           console.log(data.user.id);
//           console.log("object")
//           const authToken = jwt.sign(data, jwtSecret);
//           success = true
//         // global.suc = true;
//           res.json({ success, authToken })
//         //   const authToken = jwt.sign(data,jwtSecret)
//         //  return res.json({success:true,authToken})
//       }
//       catch(error){
//           console.log(error);
//           res.json({success:false});
//       }

// })



router.post('/loginuser', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.name
            }
        }
        const nme = user.name
        console.log(user.name)
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, nme })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

module.exports = router;
