import React from 'react';

const Spinner = (props) => {

 return (
  <div className={`preloader-wrapper ${props.spinnerSize} right ${props.spinnerState}`}>
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
  </div>)
}

export default Spinner
