import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Comment.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
export default function Comments() {
    const navigate = useNavigate();
    const name = sessionStorage.getItem("userName"); // Fetching the username from sessionStorage
    const [comm, setComm] = useState(""); // State to handle comment input

    // Function to handle comment submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        
        const data = {
          userName: name,
          commnts: comm
        };
        
        // Send the comment data to the server using axios
        await axios.post('https://gofood-1-jhy3.onrender.com/api/comment', data)
          .then(res => {
            alert("Comment submitted successfully.");
            setComm(""); // Clear the comment input after submission
            navigate("/"); // Navigate to home page after successful submission
          })
          .catch(function (error) {
            console.log(error); // Log any errors
          });
    };

    // Function to handle changes in the comment input field
    const handleChange = async (e) => {
        setComm(e.target.value); // Update the comment state
    };

    return (
        <div>
             <div><Navbar/></div>
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', height: '100vh', width: '100vw', backgroundSize: 'cover' }}>
            <div className="cards w-50 m-auto">
                <div className="col-10">
                    <div className="comment-box">
                        <h4 className='mb-4 text-white'>Add a comment</h4>
                        <div className="comment-area">
                            <textarea className="form-control w-15" placeholder="Write your review here" rows="5" value={comm} onChange={handleChange}></textarea>
                        </div>
                        <div className="comment-btns mt-2">
                            <Link to="/" className="m-3 mx-1 btn btn-danger">Cancel</Link>
                            <button className="m-3 btn btn-success" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}
