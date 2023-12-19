import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './Comment.css';
import axios from 'axios';

export default function Comments() {
    const navigate = useNavigate();
    const name = sessionStorage.getItem("userName");
    const [comm, setComm] = useState("");

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log("called");
        // let response = await fetch("http://localhost:5000/api/comment", {
        //     // credentials: 'include',
        //     // Origin:"http://localhost:3000/login",
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userName: name,
        //         commnts: comm,
        //         order_date: new Date().toDateString()
        //     })
        // });
        // // console.log("JSON RESPONSE:::::", response.status)


        e.preventDefault();
        // console.log(e);
        
        const headers = {
          "Content-Type": "application/json",
          // Authorization: apiKey,
        };
        const data = {
          userName: name,
          commnts: comm,
        //   order_date: new Date().toDateString()  
        }
        console.log(data);
        await axios.post('http://localhost:5000/api/comment', data).then(res => {
            console.log(sessionStorage.getItem("userName"))
    
          console.log(res.data.error);
        //   const signedUp = res.data.error;
        //   setShow(false);
        //   if (signedUp !== undefined) {
        //     setSign(true);
        //   }
        //   else {
        //     setSign(false);
    
    
        //     localStorage.setItem("signup", "success");
            alert("Comment submitted successfully.");
            setComm("");

            navigate("/")
        //   }
        })
          .catch(function (error) {
            // alert("Invalid");
            // setShow(true);
            // setSign(false);
            console.log(error);
          });
    
    


    }
    const handleChange = async(e) =>{
        setComm(e.target.value);
        console.log(comm);
    }





    return (

        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', width: '100vw', backgroundSize: 'cover' }}>
            <div className="cards w-50 m-auto bg-dark" style={{ "top": "25%" }}>

                {/* <div className="row"> */}


                <div className="col-10">

                    <div className="comment-box  ">

                        <h4 className='mb-4 text-white'>Add a comment</h4>

                        {/* <div className="rating"> 
                               <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label></input>
                               <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label></input>
                               <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label></input>
                               <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label></input>
                               <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label></input>
                           </div> */}

                        <div className="comment-area">

                            <textarea className="form-control w-15" placeholder="Write your review here" rows="5" value={comm} onChange={handleChange} ></textarea>

                        </div>

                        <div className="comment-btns mt-2">


                            <Link to="/" className="m-3 mx-1 btn btn-danger" >Cancel</Link>
                            <button className="m-3 btn btn-success" onClick={handleSubmit}>Submit</button>



                        </div>


                    </div>

                    {/* </div> */}


                </div>

            </div>
        </div>
    )
}