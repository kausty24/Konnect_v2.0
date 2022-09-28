
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {

    const navigate = useNavigate();

    function logoutHandler(){
        localStorage.clear();
        navigate("/")
    }

  return (
    <div>
        <button className="btn btn-lg btn-danger my-5" onClick={logoutHandler}>
            Logout
        </button>
  </div>
  )
}


