// const mongoose = require("mongoose");
// // const mongoURI = 'mongodb+srv://shivang:shivang@cluster0.51eelfu.mongodb.net/gofoods?retryWrites=true&w=majority';
// //  const mongoURI = 'mongodb+srv://mrshivanggupta:Shivang@02@cluster0.za1xtwi.mongodb.net/Demo_Menu?retryWrites=true&w=majority';
// //  const mongoURI = 'mongodb+srv://mrshivanggupta:Shivang%4002@cluster0.za1xtwi.mongodb.net/Demo_Menu'
// // const mongoURI = 'mongodb://shivang:shivang@ac-chwfz0i-shard-00-00.51eelfu.mongodb.net:27017,ac-chwfz0i-shard-00-01.51eelfu.mongodb.net:27017,ac-chwfz0i-shard-00-02.51eelfu.mongodb.net:27017/gofoods?ssl=true&replicaSet=atlas-12gmst-shard-0&authSource=admin&retryWrites=true&w=majority'
// // const mongoURI = 'mongodb://mrshivanggupta:Shivang@02@ac-chwfz0i-shard-00-00.51eelfu.mongodb.net:27017,ac-chwfz0i-shard-00-01.51eelfu.mongodb.net:27017,ac-chwfz0i-shard-00-02.51eelfu.mongodb.net:27017/Demo_Menu?ssl=true&replicaSet=atlas-12gmst-shard-0&authSource=admin&retryWrites=true&w=majority'
// // const mongoURI = 'mongodb+srv://mrshivanggupta:Shivang02@cluster0.za1xtwi.mongodb.net/Demo_Menu?retryWrites=true&w=majority';
// // const mongoURI = 'mongodb+srv://mrshivanggupta:Shivang02@cluster0.za1xtwi.mongodb.net/Demo_Menu'
// mongoURI = 'mongodb+srv://mrshivanggupta:Shivang02@cluster0.za1xtwi.mongodb.net/Demo_Menu?retryWrites=true&w=majority'
// // const mongoURI = 'mongodb://mrshivanggupta:Shivang02@ac-xtgehis-shard-00-00.za1xtwi.mongodb.net:27017,ac-xtgehis-shard-00-01.za1xtwi.mongodb.net:27017,ac-xtgehis-shard-00-02.za1xtwi.mongodb.net:27017/Demo_Menu?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority'
// const url = 'food_items';
// console.log(url);
// mongoose.connect(mongoURI,()=>{
//   console.log("connected");
// })
// const mongoDB = async() =>{
//     try {
//         mongoose.set("strictQuery", false);
//         await mongoose.connect(mongoURI,{useNewUrlParser: true});
//         console.log("Connected to Mongo Successfully!!!!");
//         const db = mongoose.connection.collection("food_items");
//         const  fetched_data = await mongoose.connection.collection(url);
//         console.log(fetched_data);
//         const tmp = await fetched_data.find({}).toArray();
//         global.food_items = tmp; 
//         const  fetc_data = await mongoose.connection.collection("category_items");
//         const fetc_data_tmp = await fetc_data.find({



//         }).toArray();
//         global.category_items = fetc_data_tmp;
//         const  fetc_data_cat = await mongoose.connection.collection("coupons");
//         const fetc_data_cat_tmp = await fetc_data_cat.find({}).toArray();
//         console.log(fetc_data_cat_tmp);

//         // console.log(global.category_items);
//         // console.log(fetched_data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
// module.exports = {mongoDB};

// // module.exports = function (callback) {
// //     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
// //         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
// //         if (err) console.log("---" + err)
// //         else {
// //             // var database =
// //             console.log("connected to mongo")
// //             const foodCollection = await mongoose.connection.db.collection("food_items");
// //             foodCollection.find({}).toArray(async function (err, data) {
// //                 const categoryCollection = await mongoose.connection.db.collection("Categories");
// //                 categoryCollection.find({}).toArray(async function (err, Catdata) {
// //                     callback(err, data, Catdata);

// //                 })
// //             });
// //         }
// //     })
// // };


const mongoose = require("mongoose");
// const mongoURI = 'mongodb+srv://shivang:shivang@cluster0.51eelfu.mongodb.net/gofoods?retryWrites=true&w=majority';
const mongoURI = 'mongodb+srv://mrshivanggupta:Shivang02@cluster0.za1xtwi.mongodb.net/Demo_Menu?retryWrites=true&w=majority'
const url = 'food_items';
console.log(url);
const mongoDB = async() =>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoURI,{useNewUrlParser: true});
        console.log("Connected to Mongo Successfully!!!!");
        const db = mongoose.connection.collection(url);
        const  fetched_data = await mongoose.connection.collection(url);
        const tmp = await fetched_data.find({}).toArray();
        console.log(tmp);
        global.food_items = tmp; 
        const  fetc_data = await mongoose.connection.collection("category_items");
        const fetc_data_tmp = await fetc_data.find({}).toArray();
        global.category_items = fetc_data_tmp;
        const  fetc_data_cat = await mongoose.connection.collection("coupons");
        const fetc_data_cat_tmp = await fetc_data_cat.find({}).toArray();
        // console.log(fetc_data_tmp);

        // console.log(global.category_items);
        // console.log(fetched_data);
      } catch (error) {
        console.log(error);
      }
    };
module.exports = {mongoDB};

// module.exports = function (callback) {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const foodCollection = await mongoose.connection.db.collection("food_items");
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("Categories");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {
//                     callback(err, data, Catdata);

//                 })
//             });
//         }
//     })
// };