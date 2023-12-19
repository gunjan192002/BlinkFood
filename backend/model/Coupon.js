const mongoose = require('mongoose');

const {Schema} = mongoose;

const CouponSchema = new Schema({
    coupon:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },

  });

  module.exports = mongoose.model('coupon',CouponSchema)