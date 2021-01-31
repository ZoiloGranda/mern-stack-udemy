import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import Spinner from './Spinner';

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
  <Spinner spinnerState={showDeletePostSpinner} spinnerSize="small"/>
 </React.Fragment>)
}
export default DeletePost