import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function MyOrder() {
    const navigate = useNavigate();
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(sessionStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }
    
    const orderNow = () => {
        navigate("/");
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className='bg-dark'>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5 text-white bg-dark'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : 
                                <div className='mt-5 mb-5 text-center fs-3 text-white'>
                                    <h1>
                                        Nothing ordered yet.
                                    </h1>
                                    <button className=' btn bg-success mt-5 mx-1 fs-5' onClick={orderNow}>Order Now</button>
                                </div>
                        )
                    }) :
                        <div className='mt-5 mb-5 text-center fs-3 text-white'>
                            <h1>
                                Nothing ordered yet.
                            </h1>
                            <button className=' btn bg-success mt-5 mx-1 fs-5 mb-5' onClick={orderNow}>Order Now</button>
                        </div>
                    }
                </div>


            </div>
            <div>

                <Footer className="mt-5" />
            </div>
        </div>
    )
}
