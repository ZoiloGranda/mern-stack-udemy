import React,{useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import M from 'materialize-css';

const NewPassword = () => {
 const history = useHistory();
 const [password, setPassword] = useState('');
 const {token} = useParams();
 const PostData = () => {
  fetch('/newpassword', {
   method: 'post',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({password, token})
  }).then(res => res.json()).then(data => {
   if (data.error) {
    M.toast({html: data.error, classes: 'red darken-3'})
   } else {
    M.toast({html: data.message, classes: 'green darken-1'})
    history.push('/signin')
   }
  }).catch(err=>{
   console.log(err)
  })
 }
 
 return (<div className="mycard">
  <div className="card auth-card input-field">
   <h2>Instaclone</h2>
   <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}/>
   <button className="btn waves-effect waves-light  blue darken-1" onClick={()=>PostData()}>Update Password
   </button>
  </div>
 </div>)
}

export default NewPassword