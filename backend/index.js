const express = require('express')
const app = express()
const cors = require('cors')
// const port = 5000;
app.use(cors({origin: true, credentials: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept"
  );
  next();
})
const { mongoDB } = require("./db")
// console.log(object)
mongoDB();
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.use('/api',require("./Routes/MyOrdersData"))
app.use('/api',require("./Routes/Discount"))
app.use('/api',require("./Routes/CreaeComment"))
app.use('/api',require("./Routes/ViewReview"))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT||8000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
