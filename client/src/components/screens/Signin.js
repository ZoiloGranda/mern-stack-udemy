import React from 'react';
import {Link} from 'react-router-dom'

const Signin = () => {
 return (<div className="mycard">
  <div className="card auth-card input-field">
   <h2>Instaclone</h2>
   <input type="text" placeholder="Email"/>
   <input type="password" placeholder="Password"/>
   <button className="btn waves-effect waves-light  blue darken-1">Login
   </button>
   <h5>
    <Link to="/signup">Don't have an account?</Link>
   </h5>
  </div>
 </div>)
}

export default Signin