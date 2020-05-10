import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () => {
 const {state, dispatch} = useContext(UserContext)
 const renderList = () => {
  if (state) {
   return [
    <li key="profile">
     <Link to="/profile">Profile</Link>
    </li>,
    <li key="create">
     <Link to="/create">Create Post</Link>
    </li>
   ]
  } else {
   return [
    <li key="signin">
     <Link to="/signin">Signin</Link>
    </li>,
    <li key="signup">
     <Link to="/signup">Signup</Link>
    </li>
   ]
  }
 }
 return (<nav>
  <div className="nav-wrapper white" style={{
    color: "black"
   }}>
   <Link to={state
     ? "/"
     : "signin"} className="brand-logo left">Instaclone</Link>
   <ul id="nav-mobile" className="right">
    {renderList()}
   </ul>
  </div>
 </nav>)
}

export default NavBar