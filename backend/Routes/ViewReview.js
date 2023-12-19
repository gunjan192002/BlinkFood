const express = require('express');
const router = express.Router()
const Comments = require('../model/Comment')

router.post("/viewreview",async(req,res)=>{
    const {userName} = req.body;
    try{
        const comment = await Comments.find({userName:userName});
        // const comm = comment.comment;
        // const name = comment.name
        res.json(comment);
    }
    catch(error){
        console.log(error);
    }
})


module.exports = router;