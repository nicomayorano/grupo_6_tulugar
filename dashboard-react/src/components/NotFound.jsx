import React from 'react';
import img from '../assets/images/404-error-page-not-found.jpg'

const NotFound = () => {
  return <div> <br></br>
    <h2 className='tomato'> UPSS lo sentimos... volve al sitio clikeando en menu</h2>
    <img alt='notFoundImg' src={img}></img>
  </div>;

};

export default NotFound;
