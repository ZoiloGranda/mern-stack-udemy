import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import Spinner from './Spinner';

const LikeControl = (props) => {
 const [data, setData] = useState(props.data)
 const [showSpinner, setShowSpinner] = useState('inactive')
 const { state } = useContext(UserContext)

 const likePost = (id) => {
  setShowSpinner('active')
  fetch('/like', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({ postId: id })
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }

 const unlikePost = (id) => {
  setShowSpinner('active')
  fetch('/unlike', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({ postId: id })
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }
 return (<React.Fragment>
  {
   data.likes.includes(state._id)
    ? <i className="material-icons" onClick={() => {
     unlikePost(data._id)
    }}>thumb_down</i>
    : <i className="material-icons" onClick={() => {
     likePost(data._id)
    }}>thumb_up</i>
  }
  <Spinner spinnerSize="small" spinnerState={showSpinner} />
  <h6>
   {data.likes.length}
   &nbsp;likes</h6>
 </React.Fragment>)
}

export default LikeControl