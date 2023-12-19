import React, { useState } from 'react'
import {MdDelete} from 'react-icons/md'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import axios from 'axios'
// import './Cart.css'
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  console.log(data.length);
  const [coupon,setCoupon] = useState({  name: "" })
  const [discount,setDiscount] = useState(0);
  const [show,setShow] = useState(false);

  const handleCheckOut = async() =>{
    const userMail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    console.log(userMail);
    let response = await fetch("http://localhost:5000/api/orderData", {
              // credentials: 'include',
              // Origin:"http://localhost:3000/login",
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                order_data: data,
                email: userMail,
                name: userName,
                order_date: new Date().toDateString()
              })
            });
            console.log("JSON RESPONSE:::::", response.status)
            if (response.status === 200) {
              alert("Your order is confirmed. A confirmation message has been sent to your registered email id")
              dispatch({ type: "DROP" })
            }
  }
  if (data.length === 0) {
    return (
      <div>
        <div className='mt-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const headers = {
      "Content-Type": "application/json",
      // Authorization: apiKey,
    };
    const data = {
      Coupon: coupon.name,
    }
    axios.post('http://localhost:5000/api/discount', data).then(res=>{

    // alert("User Found");
    console.log(res.data.dis);
    const dist = res.data.dis; 
    // const l = coupon.name.length;
    // // console.log(l);
    // const str =  coupon.name.slice(l-2,l);
    // console.log(str);
    setShow(false);
  
    setDiscount(parseInt(dist))
    // alert("Logged In successfully")
    // navigate("/");
    })
    .catch(function(error) {
      setShow(true);
      // alert("Incorrect Email address or password");

      console.log(error);
    });
  }
  const handleChange = e => {
    const { name, value } = e.target;
      setCoupon(prevState => ({
          ...prevState,
          [name]: value
      }));
    }


  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

//   const handleCheckOut = async () => {
//     let userEmail = sessionStorage.getItem("userEmail");
//     // console.log(data,sessionStorage.getItem("userEmail"),new Date())
//     let response = await fetch("http://localhost:5000/api/auth/orderData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         order_data: data,
//         email: userEmail,
//         order_date: new Date().toDateString()
//       })
//     });
//     console.log("JSON RESPONSE:::::", response.status)
//     if (response.status === 200) {
//       dispatch({ type: "DROP" })
//     }
//   }
    const price = data.reduce((total, food) => total + food.price, 0);
    console.log(parseInt(discount));
    const dis = discount/100*price
  let totalPrice = price - dis;
  return (
    <div>

      {console.log(data)}
      
      <div className='container m-auto mt-3 table-responsive table table-responsive-sm table-responsive-md table-responsive-lg ' >
        <table className='table table-hover '>
          <thead className=' text-success fs-7'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-white'>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 bg-danger"><MdDelete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-2 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
     
      {/* <div className="input-group mb-3  ">
  <input type="text" className="form-control w-30 " style={{"left":"0%"}} placeholder="Recipient's username" name='name' value={coupon.name} onChange={handleChange} aria-label="Recipient's username" aria-describedby="button-addon2"/>
  
</div>
  <div className='mb-3'>
  <button className="btn btn-outline-secondary" style={{"position":"relative","left":"47%"}} type="button" id="button-addon2" onClick={handleSubmit}>Button</button>
  </div> */}
   <form className='w-50 m-auto mt-2 border bg-dark border-success rounded' method='POST'>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-white text-center" >Have a Coupon code? Enter here</label>
            <input type="text" className="form-control" name='name' value={coupon.name} onChange={handleChange}/>
          </div>
          <button type="submit" className="m-3 btn btn-success text-center text-dark fw-2" onClick={handleSubmit}>Redeem</button>
          {show ?
          <div>
            <h6 className='text-danger text-center'>Invalid Coupon code</h6>

          </div>:""
        }
          </form>


    </div>
  )
}