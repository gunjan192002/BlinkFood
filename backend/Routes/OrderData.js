const express = require('express');
const router = express.Router();
const Orders =require( '../model/Order');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');




router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Orders.findOne({ 'email': req.body.email })    
    // console.log(eId)
    if (eId===null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Orders.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            // console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Orders.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            // console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    // const dt ={
    //     order:data.name
    // }
    // console.log(data.splice(1,1,{name:req.body.name}));
    var today = new Date();
    var dte = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mr.shivanggupta@gmail.com',
          pass: 'qutjvmkevdkmjjkl',
        },
      });
      const templateSource = fs.readFileSync('./Routes/template.html', 'utf8');
      const template = handlebars.compile(templateSource);
      const datas = {
        email: req.body.email,
        date: dte,
        Time: time,
        userName: req.body.name,
      };

      const html = template(datas);

      const email = {
        from: 'mr.shivanggupta@gmail.com',
        to: datas.email,
        subject: 'Food Delivery',
        html: html,
      };
      console.log(email);
      transporter.sendMail(email, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      
            
      
      
})
module.exports = router;