import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const DeletePost = (props) => {
 const [postId] = useState(props.postId)
 const [postedBy] = useState(props.postedBy)
 const [showDeletePostSpinner, setShowDeletePostSpinner] = useState('inactive')
 const [showDeletePostIcon, setShowDeletePostIcon] = useState('hide')
 const { state } = useContext(UserContext)

 const deletePost = () => {
  setShowDeletePostIcon('hide')
  setShowDeletePostSpinner('active')
  fetch(`/deletepost/${postId}`, {
   method: 'delete',
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   }
  }).then(res => res.json()).then(() => {
   setShowDeletePostSpinner('inactive')
   props.onRemove(postId)
  })
 }

 useEffect(() => {
  if (postedBy === state._id) {
   setShowDeletePostIcon('')
  }
  // eslint-disable-next-line
 }, []);

 return (<React.Fragment>
  <i className={`material-icons right ${showDeletePostIcon}`} onClick={() => deletePost()}>delete</i>
  <div className={`preloader-wrapper small right ${showDeletePostSpinner}`}>
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
 </React.Fragment>)
}
export default DeletePost