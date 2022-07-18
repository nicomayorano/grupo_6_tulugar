import React from 'react';
import image from '../assets/images/imagen-tulugar.png';
import {useEffect} from 'react';

const LastMovieInDb = () => {

  const [cardProps, setCardProps] = React.useState([]);

  useEffect(() => {
    const endpoint = `http://localhost:3000/api/dashboard/lastProduct`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setCardProps(data); 
        console.log(data);
      });
  }, []);
  


  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Ultimo producto creado
          </h5>
        </div>
       
        <div className="card-body">
        <h5 class="card-title">{cardProps.type} - {cardProps.city} , {cardProps.province}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Precio: ${cardProps.price}</h6>
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: '40rem' }}
              src={image}
              alt="image ilustratives"
            />
          </div>
          <p>
              {cardProps.description}
          </p>
          {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            View movie detail
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default LastMovieInDb;
