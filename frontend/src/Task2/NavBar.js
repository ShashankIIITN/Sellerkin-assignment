import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'

function NavBar({type, settype}) {
    
    
    console.log(window.location.pathname)
  return (
    <div className='navbar'>Sellerkin 
    {type == 1 ? <Link to="/task2" onClick={()=>{settype(!type)}}> Task2</Link> : <Link to="/" onClick={()=>{settype(!type)}}>Task1</Link>}
    </div>
  )
}

export default NavBar