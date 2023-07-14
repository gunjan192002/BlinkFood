import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

export default function Reviews() {

    const [data,setData] = useState([]);
    const fetchComments = async () => {
        console.log(sessionStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/viewreview", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // email: sessionStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setData(response)
        })
    }
        console.log(data);
        useEffect (() => {
            fetchComments()
        }, [])
  return (
    <div>
        <div><Navbar/></div>
        <div className='container'>
    <div className='row'>
    {data !== {}?
    data.map((dt,i)=>{
        return (
            // <h3 key={i}>{dt.name}</h3>
            <div key={i}>
      <section className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded mt-4" 
      style={{"backgroundImage":"url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"}} >

  <div className="row d-flex justify-content-center">
    <div className="col-md-10">
      <div className="card">
        <div className="card-body m-3">
          <div className="row">
          
            <div className="col-lg-8">
              <p className="text-muted fw-light mb-4">
               {dt.comment};
              </p>
              <p className="fw-bold lead mb-2"><strong>{dt.name}</strong></p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
        )
    })
   :"" }
    </div>
        </div>
    </div>
  )
}
