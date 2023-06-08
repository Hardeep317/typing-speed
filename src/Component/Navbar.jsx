import React from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutAction } from '../ActionCreater/LoginActionCreater';
import { useDispatch } from 'react-redux';

function Navbar() {
  
  const token = useSelector((state) => {return state.userDetails.token});
  const dispatch = useDispatch();


  const handleClick = () => {
    const dataToSend = {
      auth:'',
      toekn:''
    }

    logoutAction(dataToSend, dispatch)
  }

  return (
    <div>
        <div  className='header'>
        <div><Link to='/'>Touch Typing</Link></div>
        <div className='navigate'>
            <span className='navigateBtn'><Link to='/typing'>Typing</Link></span>
            {!token && <span className='navigateBtn'><Link to='/login'>Login</Link></span>}
            {token &&  <span onClick={handleClick}>Logout</span>}
        </div>
        </div>
    </div>
  )
}

export default Navbar