import React, {useState} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom'

const CreatePost = () => {
 const history = useHistory();
 const [title, setTitle] = useState('')
 const [body, setBody] = useState('')
 const [image, setImage] = useState('')
 const [url, setUrl] = useState('')
 
 const postDetails = () => {
  const data = new FormData();
  data.append('file', image)
  data.append('upload_preset', 'instaclone')
  data.append('cloud_name', 'zgranda')
  fetch('https://api.cloudinary.com/v1_1/zgranda/image/upload', {
   method: 'post',
   body: data
  }).then(res => res.json()).then(data => {
   setUrl(data.url)
  }).catch(err => {
   console.log(err);
  })
  fetch('/createpost', {
   method: 'post',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({title, body, pic:url})
  }).then(res => res.json()).then(data => {
   if (data.error) {
    M.toast({html: data.error, classes: 'red darken-3'})
   } else {
    M.toast({html: 'Created post successfully', classes: 'green darken-1'})
    history.push('/')
   }
  }).catch(err=>{
   console.log(err)
  })
 }
 return (<div className="card input-field" style={{
   margin: '30px auto',
   maxWidth: '500px',
   padding: '20px',
   textAlign: 'center'
  }}>
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
  <button className="btn waves-effect waves-light blue darken-1" onClick={()=>postDetails()}>Submit Post</button>
 </div>)
}

export default CreatePost;