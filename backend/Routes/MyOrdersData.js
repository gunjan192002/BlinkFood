const express = require('express');
const router = express.Router();
const Order =require( '../model/Order');


router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        // console.log({orderData:eId});
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
});

module.exports = router;