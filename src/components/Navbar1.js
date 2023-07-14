import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar1() {
    return (
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
                    </div>
                    <div className='d-flex'>
                        {/* <Link className="btn bg-white text-success mx-1" to="/login">Login</Link> */}
                        <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
