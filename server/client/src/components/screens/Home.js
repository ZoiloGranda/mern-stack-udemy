import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';
import {Link} from 'react-router-dom';
import CardContent from './CardContent';
import './Home.css'

const Home = () => {
 const [data, setData] = useState([])
 const [showSpinner, setShowSpinner] = useState('inactive')
 const {state} = useContext(UserContext)
 useEffect(() => {
  setShowSpinner('active')
  fetch('/allpost', {
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   }
  }).then(res => res.json()).then(result => {
   setShowSpinner('inactive')
   setData(result.posts)
  })
 }, [])

 const deletePost = (postId) => {
  fetch(`/deletepost/${postId}`, {
   method: 'delete',
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   }
  }).then(res => res.json()).then(result => {
   const newData = data.filter(item => {
    return item._id !== result._id
   })
   setData(newData)
  })
 }
 return (<div className="home">
  {
   showSpinner === 'active'
    ? <div className="container spinner-container">
      <div className="col s12">
       <div className={`preloader-wrapper big ${showSpinner}`}>
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
    : data.map(item => {
     return (<div className="card home-card" key={item._id}>
      <h5>
       <Link to={item.postedBy._id !== state._id
         ? '/profile/' + item.postedBy._id
         : 'profile'}>{item.postedBy.name}
       </Link>
       {item.postedBy._id === state._id && <i className="material-icons right" onClick={() => deletePost(item._id)}>delete</i>}
      </h5>
      <div className="card-image">
       <img src={item.photo} alt="wallpaper"/>
      </div>
      <CardContent item={item}/>
     </div>)
    })
  }
 </div>)
}

export default Home