import React, { useState } from 'react';
import './CardContent.css'
import LikeControl from './LikeControl';
import CardComments from './CardComments';
import Spinner from './Spinner';

const CardContent = (props) => {
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
   body: JSON.stringify({ postId, text })
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   setData(result)
  }).catch(err => {
   setShowSpinner('inactive')
   console.log(err);
  })
 }

 return (<div className="card-content">
  <LikeControl data={data} />
  <h6>{data.title}</h6>
  <p>{data.body}</p>
  {
   data.comments.map(comment => {
    return <CardComments comment={comment} postId={data._id} />
   })
  }
  <div className="row">
   <form onSubmit={(e) => {
    e.preventDefault();
    makeComment(e.target[0].value, data._id);
    e.target[0].value = '';
   }}>
    <input className="col s10" type="text" placeholder="Add a comment, press Enter to send" />
    <div className="s2">
     <Spinner spinnerState={showSpinner} spinnerSize="small"/>
    </div>
   </form>
  </div>
 </div>)
}

export default CardContent