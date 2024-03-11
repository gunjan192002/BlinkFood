const DB = require('../db')
const express = require('express');
const router = express.Router()

router.get("/foodData", async (req,res)=>{
    try{
        return res.send([DB.foodItems,DB.categoryItems]);
    }
    catch(error){
        console.error(error.message);
       return res.send("server Error");
    }
})

module.exports = router;
