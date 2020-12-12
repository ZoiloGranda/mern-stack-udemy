import React, {useState, useContext} from 'react';
import './CardContent.css'
import LikeControl from './LikeControl';
import {UserContext} from '../../App'

const CardContent = (props) => {
 const {state, dispatch} = useContext(UserContext);
 const [data, setData] = useState(props.item)
 const [showSpinner, setShowSpinner] = useState('inactive')

 const makeComment = (text, postId) => {
  setShowSpinner('active')
  fetch('/comment', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({postId, text})
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   setData(result)
  }).catch(err => {
   setShowSpinner('inactive')
   console.log(err);
  })
 }

 const deleteComment = (commentId) => {
  console.log({commentId: commentId, postId: data._id});
  setShowSpinner('active')
  fetch('/deletecomment', {
   method: 'delete',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({commentId: commentId, postId: data._id})
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }

 return (<div className="card-content">
  <LikeControl data={data}/>
  <h6>{data.title}</h6>
  <p>{data.body}</p>
  {
   data.comments.map(record => {
    return <div key={record._id}>
     <div className="row mb-none">
      <div className="col s3">
       <span className="comment-username">{record.postedBy.name}&nbsp;</span>
      </div>
      <div className="col s7">
       {record.text}
      </div>
      <div className="col s1">
       <i onClick={() => {
         deleteComment(record._id)
        }} className={`material-icons right x-small ${record.postedBy._id === state._id
         ? ''
         : 'hide'}`}>delete</i>
      </div>
      <div className="col s1">
       <div className={`preloader-wrapper small right ${showSpinner}`}>
        <div className="spinner-layer spinner-blue-only">
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
      </div>

     </div>
    </div>
   })
  }
  <div className="row">
   <form onSubmit={(e) => {
     e.preventDefault();
     makeComment(e.target[0].value, data._id);
     e.target[0].value = '';
    }}>
    <input className="col s10" type="text" placeholder="Add a comment, press Enter to send"/>
    <div className="s2">
     <div className={`preloader-wrapper small ${showSpinner}`}>
      <div className="spinner-layer spinner-blue-only">
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
    </div>
   </form>
  </div>
 </div>)
}

export default CardContent