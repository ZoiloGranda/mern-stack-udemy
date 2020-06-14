import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';
import {Link} from 'react-router-dom';
import CardContent from './CardContent';
import './Home.css'

const Home = () => {
 const [data, setData] = useState([])
 const {state} = useContext(UserContext)
 useEffect(() => {
  fetch('/allpost', {
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   }
  }).then(res => res.json()).then(result => {
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
   const newData = data.filter(item=>{
    return item._id!== result._id
   })
   setData(newData)
  })
 }
 return (<div className="home">
  {
   data.map(item => {
    return (<div className="card home-card" key={item._id}>
     <h5> <Link to={
      item.postedBy._id!==state._id
      ?'/profile/'+item.postedBy._id
      :'profile'
     }>{item.postedBy.name}
     </Link> 
      {item.postedBy._id===state._id &&
      <i className="material-icons right"
       onClick={()=>deletePost(item._id)}>delete</i>
      }
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