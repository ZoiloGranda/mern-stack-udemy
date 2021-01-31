import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import CardContent from './CardContent';
import DeletePost from './DeletePost';
import './Home.css'
import Spinner from './Spinner';

const Home = () => {
 const [data, setData] = useState([])
 const [showSpinner, setShowSpinner] = useState('inactive')
 const { state } = useContext(UserContext)
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
 function handleRemove(id) {
  const newData = data.filter(item => {
   return item._id !== id
  })
  setData(newData)
 }

 return (<div className="home">
  {
   showSpinner === 'active'
    ? <div className="container spinner-container">
     <div className="col s12">
      <Spinner spinnerState={showSpinner} spinnerSize="big"/>
     </div>
    </div>
    : data.map(item => {
     return (<div className="card home-card" key={item._id}>
      <h5>
       <Link to={item.postedBy._id !== state._id
        ? '/profile/' + item.postedBy._id
        : 'profile'}>{item.postedBy.name}
       </Link>
       <DeletePost postId={item._id} postedBy={item.postedBy._id} onRemove={handleRemove}></DeletePost>
      </h5>
      <div className="card-image">
       <img src={item.photo} alt="wallpaper" />
      </div>
      <CardContent item={item} />
     </div>)
    })
  }
 </div>)
}

export default Home