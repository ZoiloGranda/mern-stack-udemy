import React,{useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App'

const Profile =()=>{
 const [mypics, setPics] = useState([])
 const {state, dispatch} = useContext(UserContext)
 const [image, setImage] = useState('');
 const [url, setUrl] = useState('');
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
    setUrl(data.url)
    localStorage.setItem('user',JSON.stringify({...state,pic:data.url}))
    dispatch({type:'UPDATEPIC', payload: data.url})
   }).catch(err => {
    console.log(err);
   })
  }
 },[image])
 const updatePhoto=(file)=>{
  setImage(file)
 }
 return(
  <div style={{maxWidth:"550px", margin:"0px auto"}}>
  <div style={{
   margin:"18px 0px",
   borderBottom:"1px solid grey"
  }}>

   <div style={{
    display: "flex",
    justifyContent: "space-around"
   }}>
    <div>
     <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
     alt="pic here" src={state?state.pic:'Loading'}/>
    </div>
    <div>
     <h4>{state?state.name:'loading'}</h4>
     <h4>{state?state.email:'loading'}</h4>
     <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
      <h6>{mypics.length} post</h6>
      <h6>{state? state.followers.length: 'loading'} followers</h6>
      <h6>{state? state.following.length: 'loading'} following</h6>
     </div>
    </div>
   </div>
   <div className="file-field input-field" style={{margin : "10px"}}>
    <div className="btn blue darken-1">
     <span>Update Photo</span>
     <input type="file" multiple="multiple" onChange={(e) => updatePhoto(e.target.files[0])}/>
    </div>
    <div className="file-path-wrapper">
     <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
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
