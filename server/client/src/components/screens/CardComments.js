import React, {
 useState,
 useContext
} from 'react';
import {
 UserContext
} from '../../App'
import Spinner from './Spinner';

const CardComments = (props) => {
 const { state } = useContext(UserContext);
 const [showSpinner, setShowSpinner] = useState('inactive')

 const deleteComment = (commentId) => {
  setShowSpinner('active')
  fetch('/deletecomment', {
   method: 'delete',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({
    commentId: commentId,
    postId: props.postId
   })
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   props.onDeleteComment(result);
  }).catch(err => {
   console.log(err);
  })
 }

 return (<div key={props.comment._id}>
  <div className="row mb-none">
   <div className="col s3">
    <span className="comment-username">{props.comment.postedBy.name}&nbsp;</span>
   </div>
   <div className="col s7">
    {props.comment.text}
   </div>
   <div className="col s1">
    <i onClick={() => {
     deleteComment(props.comment._id)
    }} className={`material-icons right x-small ${props.comment.postedBy._id === state._id
     ? ''
     : 'hide'}`}>delete</i>
   </div>
   <div className="col s1">
    <Spinner spinnerState={showSpinner} spinnerSize="small" />
   </div>
  </div>
 </div>)
}

export default CardComments
