import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {useAuthentication} from "../../../hooks/app/useAuthentication";
import {AuthContext} from "../../../index";

const Navbar = () => {
  const auth = useContext(AuthContext)
  const [user] = useAuthentication()


  const userButtons = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/" exact>Glossary</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/train">Train</NavLink>
      </li>
      <li className="nav-item">
        <span className="nav-link">{user.displayName}</span>
      </li>

      <li className="nav-item">
        <span className="nav-link" onClick={() => auth.signOut()}>Logout</span>
      </li>
    </>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" exact>English App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && userButtons}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar