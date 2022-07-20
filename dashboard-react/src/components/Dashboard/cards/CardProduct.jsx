import React from 'react';

const CardProduct = ({type}) => {
    let categoryTotal = [...type];
    let categoryUnic = new Set(categoryTotal);
    let category = [...categoryUnic ]
  return (
    <>
      <div className="col-lg-6 mb-4">
        <div className="card bg-dark text-white shadow">
          <div className="card-body">{category}</div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
