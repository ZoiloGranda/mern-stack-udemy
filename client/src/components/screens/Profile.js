import React from 'react';

const Profile =()=>{
 return(
  <div style={{maxWidth:"550px", margin:"0px auto"}}>
   <div style={{
    display: "flex",
    justifyContent: "space-around",
    margin:"18px 0px",
    borderBottom:"1px solid grey"
   }}>
    <div>
     <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
     alt="pic here" src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    </div>
    <div>
     <h4>Zoilo Granda</h4>
     <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
      <h6>41 post</h6>
      <h6>52 followers</h6>
      <h6>56 following</h6>
     </div>
    </div>
   </div>
   <div className="gallery">
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <img className="item" alt="pic here" src="https://images.unsplash.com/photo-1519176407-e10ad52ab0a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    
   </div>
  </div>
 )
}

export default Profile
