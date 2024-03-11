const { foodItems, categoryItems } = require('../db')
const express = require('express');
const router = express.Router()

router.get("/foodData", async (req,res)=>{
    try{
        // console.log(global.food_items);
        return res.send([foodItems,categoryItems]);
    }
    catch(error){
        console.error(error.message);
       return res.send("server Error");
    }
});

module.exports = router;
