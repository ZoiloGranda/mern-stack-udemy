import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom';
import './UserProfile.css'

const UserProfile = () => {
 const [userProfile, setProfile] = useState(null)
 const {state, dispatch} = useContext(UserContext)
 const {userid} = useParams()
 const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
 console.log({userProfile});
 useEffect(() => {
  fetch(`/user/${userid}`, {
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   }
  }).then(res => res.json()).then(result => {
   console.log(result);
   setProfile(result)
  })
 }, [])
 const followUser = () => {
  fetch('/follow', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({followId: userid})
  }).then(res => res.json()).then(data => {
   dispatch({
    type: 'UPDATE',
    payload: {
     following: data.following,
     followers: data.followers
    }
   })
   localStorage.setItem('user', JSON.stringify(data))
   console.log({data});
   setProfile((prevState) => {
    return {
     ...prevState,
     user: {
      ...prevState.user,
      followers: [
       ...prevState.user.followers,
       data._id
      ]
     }
    }
   })
   setShowFollow(false)
   console.log(userProfile);
  })
 }

 const unfollowUser = () => {
  fetch('/unfollow', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({unfollowId: userid})
  }).then(res => res.json()).then(data => {
   dispatch({
    type: 'UPDATE',
    payload: {
     following: data.following,
     followers: data.followers
    }
   })
   localStorage.setItem('user', JSON.stringify(data))
   console.log({data});
   setProfile((prevState) => {
    console.log({prevState});
    const newFollower = prevState.user.followers.filter(item => item !== data._id)
    return {
     ...prevState,
     user: {
      ...prevState.user,
      followers: newFollower
     }
    }
   })
   setShowFollow(true)
   console.log(userProfile);
  })
 }
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
       {
        showFollow
         ? <button className="btn waves-effect waves-light blue darken-1 follow-button" onClick={() => followUser()}>Follow
          </button>
         : <button className="btn waves-effect waves-light blue darken-1 follow-button" onClick={() => unfollowUser()}>Unfollow
          </button>
       }

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