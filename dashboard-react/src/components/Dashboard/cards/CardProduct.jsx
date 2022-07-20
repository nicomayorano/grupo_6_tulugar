
import React, { useState, useEffect} from 'react';

const CardProduct = ({type}) => {
 /* Codigo p/inyectar productos */
  const [category,setCategory]=useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/api/products')
    .then((result) => result.json())
    .then(data=>{
      setCategory(data.data.products)
  })
  .catch(err=>console.log(err))
}, [])
  let productos = [...category]
  const departamento =  productos.filter(product => product.type == 'Departamento');
  const casa =  productos.filter(product => product.type == 'Casa');
  const cabaña =  productos.filter(product => product.type == 'Cabaña');
  const quinta =  productos.filter(product => product.type == 'Quinta');
  const hotel =  productos.filter(product => product.type == 'Hotel');
  const hostel =  productos.filter(product => product.type == 'Hostel');
  const habitacion = productos.filter(product => product.type == 'Habitación'); 
  console.log(habitacion)
  return (
    <>
      <div className="col-lg-6 mb-4">
        <div className="card bg-dark text-white shadow">
        
            <div className="card-body"><h3>{type}</h3></div>
            <button type="submit" id="submit-form-save-button">{type}</button>  
        </div>
      </div>
    </>
  );
};

export default CardProduct;
