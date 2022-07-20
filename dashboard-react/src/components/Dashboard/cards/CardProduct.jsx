import React from 'react';

const CardProduct = ({genre,quantity}) => {
  return (
    <>
      <div className="col-lg-6 mb-4 ">
        <div className="card bg-dark text-white shadow">
          <div className="card-body">{genre}</div>
          <span className="badge badge-info badge-counter">{quantity}</span>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
