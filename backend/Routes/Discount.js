const express = require('express');
const router = express.Router()
const Coupons = require('../model/Coupon')



router.post('/discount',  async (req, res) => {
    let success = false

  
    const { Coupon } = req.body;
    // console.log(coupon);
    console.log(Coupon);
    try {
        let serch = await Coupons.findOne({'coupon' : Coupon });  
        if (!serch) {
            console.log(Coupon);
            return res.status(400).json({ success, error: "Invalid Coupon" });
        }
        console.log(serch);
     
       
        // const data = {
        //     serch: {
        //         discount: serch.discount
        //     }
        // }
        // console.log(data);
        const dis = serch.discount;
        console.log(serch.discount);
        success = true;
    //   console.log(Coupon)
        res.json({ success,dis})


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})


module.exports = router