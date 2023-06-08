import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div className='container'>
            <div className="imgContainer">
                <Link className="gbtn" to={'/login'}><button className="btn">Get Started</button></Link>
            </div>
            <div className="section text">
                <h2>Practice More And Ace Your Goals..</h2>
            </div>
        </div>
    </div>
  )
}

export default Home