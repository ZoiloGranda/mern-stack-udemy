import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';
import {Link} from 'react-router-dom';
import './SubscribedUserPosts.css'
import CardContent from './CardContent';

const SubscribedUserPosts = () => {
 const [data, setData] = useState([])
 const {state} = useContext(UserContext)
 useEffect(() => {
  fetch('/getsubpost', {
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
   }
  }).then(res => res.json()).then(result => {
   setData(result.posts)
  })
 }, [])

 return (<div className="home">
  {
   data.map(item => {
    return (<div className="card home-card" key={item._id}>
     <h5 className="username"> <Link to={
      item.postedBy._id!==state._id
      ?'/profile/'+item.postedBy._id
      :'profile'
     }>{item.postedBy.name}
     </Link> 
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

export default SubscribedUserPosts