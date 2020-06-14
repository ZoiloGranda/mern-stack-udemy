import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom';
import './FollowButton.css'

const FollowButton = (props) => {
 const [userProfile, setProfile] = useState(props.userProfile)
 const {state, dispatch} = useContext(UserContext)
 const {userid} = useParams()
 const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
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
 
return(<>
 {
  showFollow
   ? <button className="btn waves-effect waves-light blue darken-1 follow-button" onClick={() => followUser()}>Follow
    </button>
   : <button className="btn waves-effect waves-light blue darken-1 follow-button" onClick={() => unfollowUser()}>Unfollow
    </button>
 }
</>)
}

export default FollowButton