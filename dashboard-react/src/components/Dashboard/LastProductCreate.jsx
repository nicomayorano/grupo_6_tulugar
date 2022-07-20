import React from 'react';
//import imagen from '../../assets/images/imagen-tulugar.png';
import {useEffect, useState} from 'react';
import Table from '../Products/Table';
import { Routes, Route, Link } from 'react-router-dom';

const LastProductCreate = () => {

  //const [cardProps, setCardProps] = React.useState([]);
  //const [image, setImage] = React.useState([]);
  //{`http://localhost:3000/productsImages/${cardProps.Images.image1}`}
  //useEffect(() => {
  //  const endpoint = `http://localhost:3000/api/dashboard/lastProduct`;
  //  fetch(endpoint)
  //    .then((response) => response.json())
  //    .then((data) => {
   //     if(data.Images.image1){
  //        let _imagen=`http://localhost:3000/productsImages/${data.Images.image1}`;
   //       setImage(_imagen);
   //     }else{
   //       setImage(imagen);
   //     }
  //      setCardProps(data);   
        
   //   });
 // }, []);
  


 // return (
 //   <div className="col-lg-6 mb-4">
 //     <div className="card shadow mb-4">
 //       <div className="card-header py-3">
 //         <h5 className="m-0 font-weight-bold text-gray-800">
 //           Ultimo producto creado
 //         </h5>
 //       </div>
       
 //       <div className="card-body">
 //       <h5 className="card-title">{cardProps.type} - {cardProps.city} , {cardProps.province}</h5>
 //           <h6 className="card-subtitle mb-2 text-muted">Precio: ${cardProps.price}</h6>
 //         <div className="text-center">
 //           <img
 //             className="img-fluid px-3 px-sm-4 mt-3 mb-4"
 //             style={{ width: '40rem' }}
 //             src= {image}
 //             alt="image ilustratives"
 //           />
 //         </div>
 //         <p>
 //             {cardProps.description}
  //        </p>
 //         {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
 //           View movie detail
 //         </a> */}
 //       </div>
 //     </div>
 //   </div>
 // );

 const [productApi, setproductApi] = useState(0);
  const [lastProduct, setLastProduct] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
 
  useEffect(()=>{
    fetch("http://localhost:3000/api/product")
      .then((res) => res.json())
      .then((data) => {
        setproductApi(data.meta.total);
        setLastProduct(data.data.products[data.data.products.length-1].type)
        setProvince(data.data.products[data.data.products.length-1].province)
        setCity(data.data.products[data.data.products.length-1].city)
        setAddress(data.data.products[data.data.products.length-1].address)
        setPrice(data.data.products[data.data.products.length-1].price)
        
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col-lg-6 mb-4 cardLast">
      <div className="card shadow mb-4">
        <div className="card-header py-3 bgPurple">
          <h5 className="m-0 font-weight-bold centrado bgPurple ">
            TOTAL DE PRODUCTOS: {productApi}
          </h5>
        </div>
       
        <div className="card-body">
          <h4 className="m-0 font-weight-bold text-gray-800 centrado fontSize ">Ultimo producto creado</h4><br></br>
        <h5 class="card-title negritaAzul">Tipo de propiedad<p className='fontGrey'> {lastProduct} </p></h5>
        <h5 class="card-title negritaAzul">Provincia<p className='fontGrey'> {province} </p></h5>
        <h5 class="card-title negritaAzul">Ciudad<p className='fontGrey'> {city} </p></h5>
        <h5 class="card-title negritaAzul">Direccion<p className='fontGrey'> {address} </p></h5>
        <h5 class="card-title negritaAzul">Precio por noche<p className='fontGrey'> ${price} </p></h5>
       
         
          

          <Link to={'table'} className="btn btn-info centradoBt">
            <span>Listado completo de productos</span>
          </Link>

          <Routes>
            <Route path="table" element={<Table />} />
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default LastProductCreate;
