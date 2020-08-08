import React, {useState} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';
import './CreatePost.css'

const CreatePost = () => {
 const history = useHistory();
 const [title, setTitle] = useState('')
 const [body, setBody] = useState('')
 const [image, setImage] = useState('')
 const [url, setUrl] = useState('')
 const [showSpinner, setShowSpinner] = useState('inactive')
 const [hideSubmitBtn, setHideSubmitBtn] = useState('')
 const createPost = ({pic}) => {
  fetch('/createpost', {
   method: 'post',
   headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({title, body, pic})
  }).then(res => res.json()).then(data => {
   setHideSubmitBtn('')
   setShowSpinner('inactive')
   if (data.error) {
    M.toast({html: data.error, classes: 'red darken-3'})
   } else {
    M.toast({html: 'Created post successfully', classes: 'green darken-1'})
    history.push('/')
   }
  }).catch(err => {
   console.log(err)
  })
 }
 const postDetails = () => {
  setHideSubmitBtn('hide')
  setShowSpinner('active')
  const data = new FormData();
  data.append('file', image)
  data.append('upload_preset', 'instaclone')
  data.append('cloud_name', 'zgranda')
  fetch('https://api.cloudinary.com/v1_1/zgranda/image/upload', {
   method: 'post',
   body: data
  }).then(res => res.json()).then(data => {
   setUrl(data.url)
   createPost({pic:data.url})
  }).catch(err => {
   console.log(err);
  })
 }
 
 return (<div className="card input-field">
  <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
  <input type="text" placeholder="Description" value={body} onChange={(e) => setBody(e.target.value)}/>
  <div className="file-field input-field">
   <div className="btn blue darken-1">
    <span>Upload Image</span>
    <input type="file" multiple="multiple" onChange={(e) => setImage(e.target.files[0])}/>
   </div>
   <div className="file-path-wrapper">
    <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
   </div>
  </div>
  <button className={`btn waves-effect waves-light blue darken-1 ${hideSubmitBtn}`} onClick={() => postDetails()}>Submit Post
  </button>
  <div className={`preloader-wrapper small ${showSpinner}`}>
   <div className="spinner-layer spinner-green-only">
    <div className="circle-clipper left">
     <div className="circle"></div>
    </div>
    <div className="gap-patch">
     <div className="circle"></div>
    </div>
    <div className="circle-clipper right">
     <div className="circle"></div>
    </div>
   </div>
  </div>
 </div>)
}

export default CreatePost;