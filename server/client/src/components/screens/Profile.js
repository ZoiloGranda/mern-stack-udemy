import React,{useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App'
import './Profile.css';

const Profile =()=>{
 const [mypics, setPics] = useState([])
 const {state, dispatch} = useContext(UserContext)
 const [image, setImage] = useState('');
 console.log({state});
 useEffect(()=>{
  fetch('/mypost',{
   headers:{
    Authorization: 'Bearer '+localStorage.getItem('jwt')
   }
  }).then(res=>res.json())
  .then(result=>{
   setPics(result.mypost)
  })
 },[])
 useEffect(()=>{
  if (image) {
   const data = new FormData();
   data.append('file', image)
   data.append('upload_preset', 'instaclone')
   data.append('cloud_name', 'zgranda')
   fetch('https://api.cloudinary.com/v1_1/zgranda/image/upload', {
    method: 'post',
    body: data
   }).then(res => res.json()).then(data => {
    fetch('/updatepic',{
     method:'put',
     headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('jwt')
     },
     body:JSON.stringify({
      pic:data.url
     })
    }).then(res=>res.json())
    .then(result=>{
     localStorage.setItem('user',JSON.stringify({...state,pic:result.pic}))
     dispatch({type:'UPDATEPIC', payload: result.pic})
    })
   }).catch(err => {
    console.log(err);
   })
  }
 },[image])
 const updatePhoto=(file)=>{
  setImage(file)
 }
 return(
  <div className="profile-container">
  <div className="profile-div">
   <div className="profile-content">
    <div>
     <img className="profile-pic"
     alt="pic here" src={state?state.pic:'Loading'}/>
    </div>
    <div>
     <h4>{state?state.name:'loading'}</h4>
     <h4>{state?state.email:'loading'}</h4>
     <div className="profile-stats">
      <h6>{mypics.length} post</h6>
      <h6>{state? state.followers.length: 'loading'} followers</h6>
      <h6>{state? state.following.length: 'loading'} following</h6>
     </div>
    </div>
   </div>
   <div className="file-field input-field">
    <div className="btn blue darken-1">
     <span>Update Photo</span>
     <input type="file" multiple="multiple" onChange={(e) => updatePhoto(e.target.files[0])}/>
    </div>
    <div className="file-path-wrapper">
     <input className="file-path validate" type="text" placeholder="Update you user photo"/>
    </div>
   </div>
  </div>
   <div className="gallery">
   {
    mypics.map(item=>{
     return <img className="item" key={item._id} alt={item.title} src={item.photo}/>
    })
   }
   </div>
  </div>
 )
}

export default Profile
