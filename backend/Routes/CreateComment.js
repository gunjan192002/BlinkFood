const express = require('express');
const router = express.Router()
const Comments = require('../model/Comment')


router.post("/comment",async(req,res)=>{
    const {userName} = req.body
    let eId = await Comments.findOne({ 'name': userName })    
    // console.log(eId)
    if (eId===null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Comments.create({
                name: userName,
                comment : req.body.commnts
            }).then(() => {
                res.json({ success: true,userName })
            })
        } catch (error) {
            // console.log(error.message)
            res.status(200).send(error)

        }
    }

    else {
        try {
            await Comments.findOneAndUpdate({userName:userName},
                { $push:{comment: req.body.commnts} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            // console.log(error.message)
            res.send("Server Error")
        }
    }
})


module.exports = router;
