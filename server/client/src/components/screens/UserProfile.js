import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './UserProfile.css'
import FollowButton from './FollowButton';

const UserProfile = () => {
 const [userProfile, setProfile] = useState(null)
 const {userid} = useParams()
 
const getUserProfile=()=>{
 fetch(`/user/${userid}`, {
  headers: {
   Authorization: 'Bearer ' + localStorage.getItem('jwt')
  }
 }).then(res => res.json()).then(result => {
  console.log(result);
  setProfile(result)
 })
}
useEffect(getUserProfile, [])
 return (<> {
  userProfile
   ? <div className="user-profile-container">
     <div className="user-profile-div">
      <div>
       <img className="user-profile-pic" alt="pic here" src={userProfile.user.pic}/>
      </div>
      <div>
       <h4>{userProfile.user.name}</h4>
       <h5>{userProfile.user.email}</h5>
       <div className="user-profile-stats">
        <h6>{userProfile.posts.length}
         &nbsp;post</h6>
        <h6>{userProfile.user.followers.length}
         &nbsp;followers</h6>
        <h6>{userProfile.user.following.length}
         &nbsp;following</h6>
       </div>
       <FollowButton userProfile={userProfile}/>

      </div>
     </div>
     <div className="gallery">
      {
       userProfile.posts.map(item => {
        return <img className="item" key={item._id} alt={item.title} src={item.photo}/>
       })
      }
     </div>
    </div>

   : <h2>Loading...</h2>
 } < />
 )
}

export default UserProfile