import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom';

const Profile = () => {
 const [userProfile, setProfile] = useState(null)
 const [showFollow, setShowFollow] = useState(true)
 const {dispatch} = useContext(UserContext)
 const {userid} = useParams()
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
    //user:data.result
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
   ? <div style={{
      maxWidth: "550px",
      margin: "0px auto"
     }}>
     <div style={{
       display: "flex",
       justifyContent: "space-around",
       margin: "18px 0px",
       borderBottom: "1px solid grey"
      }}>
      <div>
       <img style={{
         width: "160px",
         height: "160px",
         borderRadius: "80px"
        }} alt="pic here" src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
      </div>
      <div>
       <h4>{userProfile.user.name}</h4>
       <h5>{userProfile.user.email}</h5>
       <div style={{
         display: "flex",
         justifyContent: "space-between",
         width: "108%"
        }}>
        <h6>{userProfile.posts.length}
         post</h6>
        <h6>{userProfile.user.followers.length}
         &nbsp;followers</h6>
        <h6>{userProfile.user.following.length}
         &nbsp;following</h6>
       </div>
       {
        showFollow
         ? <button style={{
            margin: '10px'
           }} className="btn waves-effect waves-light  blue darken-1" onClick={() => followUser()}>Follow
          </button>
         : <button style={{
            margin: '10px'
           }} className="btn waves-effect waves-light  blue darken-1" onClick={() => unfollowUser()}>Unfollow
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

export default Profile