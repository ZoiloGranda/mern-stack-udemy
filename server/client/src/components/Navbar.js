import React, {useContext, useRef, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css';

const NavBar = () => {
 const searchModal = useRef(null)
 const [search, setSearch] = useState('')
 const {state, dispatch} = useContext(UserContext)
 const history = useHistory()
 useEffect(()=>{
  M.Modal.init(searchModal.current)
 },[])
 const renderList = () => {
  if (state) {
   return [
    <li key="search"><i data-target="modal1" className="modal-trigger large material-icons" style={{color:'black'}}>search</i></li>,
    <li key="profile">
     <Link to="/profile">Profile</Link>
    </li>,
    <li key="create">
     <Link to="/create">Create Post</Link>
    </li>,
    <li key="myfollowerspost">
     <Link to="/myfollowingpost">My following Posts</Link>
    </li>,
    <li key="logout">
     <button className="btn waves-effect waves-light red darken-3" onClick={()=>{
      localStorage.clear()
      dispatch({
       type:'CLEAR'
      })
      history.push('/signin')
     }}
     >Logout
    </button>
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
  <div id="modal1" className="modal" ref={searchModal} style={{color:'black'}}>
   <div className="modal-content">
    <input type="text" placeholder="Search users" value={search}
     onChange={(e) => setSearch(e.target.value)}/>
     <ul className="collection">
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
     </ul>
    </div>
    <div className="modal-footer">
     <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
    </div>
   </div>
  </div>
 </nav>)
}

export default NavBar