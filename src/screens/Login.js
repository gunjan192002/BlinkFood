import {React,useState,useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Navbar1 from '../components/Navbar1'

export default function Login() {
  const [credentials, setCredentials] = useState({  email: "", password: "" })
  const [show,setShow] = useState(false);
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const headers = {
      "Content-Type": "application/json",
      // Authorization: apiKey,
    };
    const data = {
      email: credentials.email,
      password: credentials.password,
    }
    axios.post('http://localhost:5000/api/loginuser', data).then(res=>{

    // alert("User Found");
    // console.log(res.authToken);
    // sessionStorage.setItem('token', res.authToken)

    sessionStorage.setItem("userEmail",credentials.email);
  
    setShow(false);
    console.log(res.data.nme);
    const userName = res.data.nme;
    console.log(userName)
    sessionStorage.setItem("userName",userName);
    console.log(sessionStorage.getItem("userName"));
    alert("Logged In successfully")
    navigate("/");
    })
    .catch(function(error) {
      // alert("Incorrect Email address or password");
      setShow(true);
      console.log(error);
    });
  }
  const handleChange = e => {
    const { name, value } = e.target;
      setCredentials(prevState => ({
          ...prevState,
          [name]: value
      }));
    }
    useEffect(() => {
    setShow(false);
    sessionStorage.setItem("login","success");
  }, [])

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
          

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
              
              {(sessionStorage.getItem("userEmail"))?
              <li className="nav-item">
                <Link className='nav-link  active fs-5' aria-current="page" to="/myorders">My Orders</Link>
              </li>
              :""}
            </ul>
            {(!sessionStorage.getItem("userEmail")) ?
                            <form className="d-flex">
                              
                                {/* <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link> */}
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </form> :""}
      </div>
      </div>
      </nav>
        </div>
    </div>
      
    <div className='container'>

    <div className='container' >
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' method='POST'>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
            <input type="email" className="form-control" name='email' placeholder='Email address' value={credentials.email} onChange={handleChange}/>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' placeholder='Password' value={credentials.password}  onChange={handleChange}/>
          </div>
          <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Login</button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">New User?</Link>
          {(show)?
        <div className='text-danger text-center mt-4 fs-4'>Invalid credentials</div>  
       :"" }
        </form>
      </div>
  </div>
    </div>
  )
};