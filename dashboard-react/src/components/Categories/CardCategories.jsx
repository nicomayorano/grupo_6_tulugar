import React from 'react';
import {useEffect, useState} from 'react';
import Categories from '../Categories/Categories';
import { Routes, Route, Link } from 'react-router-dom';
import CategoriaImg from '../../assets/images/depositphotos_19753399-stock-photo-real-estate-house-logo.webp';

function CardCategories(){
 // const [userApi, setUserApi] = useState(0);
 // const [lastUser, setLastUser] = useState('');
 // const [lastUserEmail, setLastUserEmail] = useState('');
 // const [lastUserType, setLastUserType] = useState('');
 
  useEffect(()=>{
    fetch("http://localhost:3000/api/userApi")
      .then((res) => res.json())
      .then((data) => {
      //  setUserApi(data.meta.total);
      //  setLastUser(data.data.users[data.data.users.length-1].username)
      //  setLastUserEmail(data.data.users[data.data.users.length-1].email)
     //   setLastUserType(data.data.users[data.data.users.length-1].type)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col-lg-6 mb-4 cardLast">
      <div className="card shadow mb-4">
        <div className="card-header py-3 bgPurple">
          <h5 className="m-0 font-weight-bold centrado bgPurple ">
            CATEGORIAS {}
          </h5>
        </div>
       
        <div className="card-body">
          <h4 className="m-0 font-weight-bold text-gray-800 centrado fontSize ">Tipos de propiedades</h4><br></br>
          <div className="text-center">
            <img src={CategoriaImg} alt='avatar' className='categorieImg'/>
          </div><br></br>
        <h5 className="card-title negritaAzul">Cabaña<p className='fontGrey'> {}</p></h5>
        <h5 className="card-title negritaAzul">Casa<p className='fontGrey'> {}</p></h5>
        <h5 className="card-title negritaAzul">Departamento<p className='fontGrey'> {}</p></h5>
        <h5 className="card-title negritaAzul">Habitación<p className='fontGrey'> {}</p></h5>
        <h5 className="card-title negritaAzul">Hostel<p className='fontGrey'> {}</p></h5>
        <h5 className="card-title negritaAzul">Hotel<p className='fontGrey'> {}</p></h5>
        <h5 className="card-title negritaAzul">Quinta<p className='fontGrey'> {}</p></h5><p></p>

          <Link to={'categories'} className="btn btn-info centradoBt">
            <span>Listado completo del total de propiedades por categoria</span>
          </Link>

          <Routes>
            <Route path="categories" element={<Categories />} />
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default CardCategories;