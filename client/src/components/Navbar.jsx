import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Auth } from "../context/Usercontext"

const Navbar = () => {

  const [user, setUser] = Auth();
  const id = localStorage.getItem("id");
  const cardId = localStorage.getItem("cardId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({})
  }

  return (
    <div className='w-full text-white h-12 bg-red-300 flex items-center px-6'>
      <div className='w-full flex items-center justify-between'>
        <div className="left text-xl font-bold">LOGO</div>
        <div className="right flex gap-4 text-lg font-semibold">
          { user.fullName && <Link to={ "/" }>Home</Link> }
          {!user.fullName && 
            <>
              <Link to={ "/login" }>Login</Link>
              <Link to="/register">Register</Link>
            </>
          }
          {/* {user.fullName && <Link to={"/idcard"}>Idcard</Link>} */}
          {user.fullName && <Link onClick={ handleLogout } to="/login">Logout</Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
