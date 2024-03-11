const mongoose = require("mongoose");
// const mongoURI = 'mongodb+srv://shivang:shivang@cluster0.51eelfu.mongodb.net/gofoods?retryWrites=true&w=majority';
const mongoURI = 'mongodb://shivang:shivang@ac-chwfz0i-shard-00-00.51eelfu.mongodb.net:27017,ac-chwfz0i-shard-00-01.51eelfu.mongodb.net:27017,ac-chwfz0i-shard-00-02.51eelfu.mongodb.net:27017/gofoods?ssl=true&replicaSet=atlas-12gmst-shard-0&authSource=admin&retryWrites=true&w=majority'
const url = 'food_items';
console.log(url);
let foodItems = [];
let categoryItems = [];
const mongoDB = async() =>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoURI,{useNewUrlParser: true});
        console.log("Connected to Mongo Successfully!!!!");
        // const db = mongoose.connection.collection(url);
        // console.log(db);
        const  fetched_data = await mongoose.connection.collection(url);
        const tmp = await fetched_data.find({}).toArray();
        foodItems = tmp;
        const  fetc_data = await mongoose.connection.collection("category_items");
        const fetc_data_tmp = await fetc_data.find({}).toArray();
        categoryItems = fetc_data_tmp;
        const  fetc_data_cat = await mongoose.connection.collection("coupons");
        const fetc_data_cat_tmp = await fetc_data_cat.find({}).toArray();
      
      } catch (error) {
        // console.log(error);
      }
    };
module.exports = {mongoDB, foodItems, categoryItems};
