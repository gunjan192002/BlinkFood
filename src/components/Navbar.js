import { React } from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success" >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  )
}
