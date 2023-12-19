
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [show, setShow] = useState(false);
  const [sign, setSign] = useState(false);
  const navigate = useNavigate();
  // const {credentials,setCredentials} = useState({name: "", email: "",password: "",geolocation: ""});
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  // const handleSubmit = async (e) =>{
  //         e.preventDefault();
  //        const response = await fetch("http://localhost:5000/api/createuser",{
  //         method: 'POST',
  //         headers: { 
  //             'Content-Type' : 'application/json'
  //         },
  //         body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
  //     });
  //     const json = await response.json()
  //     console.log(json);

  //     if(!json.success){
  //         alert("Enter Valid Crendentials");
  //     }
  //     await fetch(url, {
  //       mode: 'no-cors'
  //  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const headers = {
      "Content-Type": "application/json",
      // Authorization: apiKey,
    };
    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation,
    }
    await axios.post('http://localhost:5000/api/createuser', data).then(res => {

      console.log(res.data.error);
      const signedUp = res.data.error;
      setShow(false);
      if (signedUp !== undefined) {
        setSign(true);
      }
      else {
        setSign(false);


        sessionStorage.setItem("signup", "success");
        alert("Signed in successfully.");
        navigate("/login")
      }
    })
      .catch(function (error) {
        // alert("Invalid");
        setShow(true);
        setSign(false);
        console.log(error);
      });




    //   const response = await fetch('http://localhost:5000/api/createuser' {
    //     // mode: 'no-cors',
    //     // credentials: 'include',
    //     // Origin:"http://localhost:3000/login",
    //     method: 'POST',
    //     headers: {
    //       'Accept' : 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify( data )

    //   })
    //   const json = await response.json()
    //   console.log(json);
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleMailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    // onchange();
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
    // console.log(e.target.value);
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>


      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-success" >
            <div className="container-fluid">
              <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto ">
                  <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                  </li>


                </ul>
                {(!sessionStorage.getItem("userEmail")) ?
                  <form className="d-flex">

                    <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                    {/* <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link> */}
                  </form> : ""}
              </div>
            </div>
          </nav>
        </div>
      </div>


      <div className='container'>
        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' method='POST'>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              {/* <input type="text" className="form-control"  value={name} onChange={handleNameChange}/> */}
              <input value={credentials.name} type="text" className="form-control" placeholder='Full Name' onChange={handleChange} name="name" />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' placeholder='Email address' value={credentials.email} onChange={handleChange} />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='geolocation' placeholder='Address' value={credentials.geolocation} onChange={handleChange} />
              </fieldset>
            </div>

            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} placeholder='Password' onChange={handleChange} />
            </div>
            <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Signup</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user?</Link>
            {(sign) ?
              <div className='text-danger text-center mt-4 fs-5'>You are already a registered user.<Link to="/login" style={{ "text-decoration": "none" }}>  Click here to login</Link></div>
              : ""}
            {(show) ?
              <div className='text-danger text-center mt-4 fs-4'>Enter valid details</div>
              : ""}
          </form>
        </div>
      </div>
    </div>
  )
}

