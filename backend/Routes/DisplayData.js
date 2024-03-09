const express = require('express');
const router = express.Router()

router.get("/foodData", async (req,res)=>{
    try{
        // console.log(global.food_items);
        res.send([global.food_items,global.category_items]);
    }
    catch(error){
        console.error(error.message);
        res.send("server Error");
    }
})

module.exports = router;
