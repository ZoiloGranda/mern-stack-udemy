import React from 'react';

const CreatePost = ()=> {
 return(
 <div className="card input-field" style={{
  margin:'30px auto',
  maxWidth: '500px',
  padding:'20px',
  textAlign:'center'
 }}>
  <input type="text" placeholder="Title"/>
  <input type="text" placeholder="Description"/>
  <div className="file-field input-field">
   <div className="btn blue darken-1">
    <span>Upload Image</span>
    <input type="file" multiple="multiple"/>
   </div>
   <div className="file-path-wrapper">
    <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
   </div>
  </div>
  <button className="btn waves-effect waves-light  blue darken-1">Submit Post</button>
 </div>)
}

export default CreatePost;