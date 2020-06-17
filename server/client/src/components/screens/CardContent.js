import React, {useState, useContext} from 'react';
import {UserContext} from '../../App';
import './CardContent.css'

const CardContent = (props) => {
 const [data, setData] = useState(props.item)
 const {state} = useContext(UserContext)
 const likePost = (id) => {
  fetch('/like', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({postId: id})
  }).then(res => res.json()).then(result => {
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }
 
 const unlikePost = (id) => {
  fetch('/unlike', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({postId: id})
  }).then(res => res.json()).then(result => {
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }
 const makeComment = (text, postId) => {
  fetch('/comment', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({postId, text})
  }).then(res => res.json()).then(result => {
   setData(result)
  }).catch(err => {
   console.log(err);
  })
 }
 
 return(
  <div className="card-content">
   {
    data.likes.includes(state._id)
    ? <i className="material-icons" onClick={() => {
     unlikePost(data._id)
    }}>thumb_down</i>
    : <i className="material-icons" onClick={() => {
     likePost(data._id)
    }}>thumb_up</i>
   }
   <h6>{data.likes.length}
    &nbsp;likes</h6>
    <h6>{data.title}</h6>
    <p>{data.body}</p>
    {
     data.comments.map(record => {
      return <h6 key={record._id}>
       <span className="comment-username">{record.postedBy.name}&nbsp;</span>{record.text}</h6>
      })
     }
     <form onSubmit={(e) => {
      e.preventDefault()
      makeComment(e.target[0].value, data._id)
     }}>
     <input type="text" placeholder="Add a comment"/>
    </form>
   </div>)
  }
  
  export default CardContent