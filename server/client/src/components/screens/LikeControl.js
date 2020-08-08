import React, {useState, useContext} from 'react';
import {UserContext} from '../../App';

const LikeControl = (props) => {
 const [data, setData] = useState(props.data)
 const [showSpinner, setShowSpinner] = useState('inactive')
 const {state} = useContext(UserContext)

 const likePost = (id) => {
  setShowSpinner('active')
  fetch('/like', {
   method: 'put',
   headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   },
   body: JSON.stringify({postId: id})
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
   body: JSON.stringify({postId: id})
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
  <div className={`preloader-wrapper small ${showSpinner}`}>
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
  <h6>
   {data.likes.length}
   &nbsp;likes</h6>
 </React.Fragment>)
}

export default LikeControl