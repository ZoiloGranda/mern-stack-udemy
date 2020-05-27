import React, {useContext, useRef, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css';

const NavBar = () => {
 const searchModal = useRef(null)
 const [search, setSearch] = useState('')
 const [userDetails, setUserDetails] = useState([])
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
const fetchUsers = (query)=>{
 setSearch(query)
 fetch('/search-users',{
  method:'post',
  headers:{
   'Content-Type':'application/json'
  },
  body:JSON.stringify({
   query
  })
 }).then(res=>res.json())
 .then(results=>{
  setUserDetails(results.user)
 })
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
     onChange={(e) => fetchUsers(e.target.value)}/>
     <ul className="collection">
      {userDetails.map(item=>{
       return <Link key={item._id} to={item._id !== state._id ?"/profile/"+item._id:'/profile'} onClick={()=>{
        M.Modal.getInstance(searchModal.current).close()
        setSearch('')
       }}><li className="collection-item">{item.email}</li></Link>
      })}
     </ul>
    </div>
    <div className="modal-footer">
     <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
    </div>
   </div>
  </div>
 </nav>)
}

export default NavBar