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
 const [data, setData] = useState(props.comment)
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
   console.log({ result });
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }

 return (<div key={data._id}>
  <div className="row mb-none">
   <div className="col s3">
    <span className="comment-username">{data.postedBy.name}&nbsp;</span>
   </div>
   <div className="col s7">
    {data.text}
   </div>
   <div className="col s1">
    <i onClick={() => {
     deleteComment(data._id)
    }} className={`material-icons right x-small ${data.postedBy._id === state._id
     ? ''
     : 'hide'}`}>delete</i>
   </div>
   <div className="col s1">
    <Spinner spinnerState={showSpinner} spinnerSize="small"/>
   </div>
  </div>
 </div>)
}

export default CardComments
