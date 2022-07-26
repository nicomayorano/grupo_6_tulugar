import React from 'react';
import {useEffect, useState} from 'react';
import UserList from './UserList';
import { Routes, Route, Link } from 'react-router-dom';

function UserLast(){
  const [userApi, setUserApi] = useState(0);
  const [lastUser, setLastUser] = useState('');
  const [lastUserEmail, setLastUserEmail] = useState('');
  const [lastUserType, setLastUserType] = useState('');
  const [lastUserImg, setLastUserImg] = useState([]);
 
  useEffect(()=>{
    fetch("http://localhost:3000/api/userApi")
      .then((res) => res.json())
      .then((data) => {
        setUserApi(data.meta.total);
        setLastUser(data.data.users[data.data.users.length-1].username)
        setLastUserEmail(data.data.users[data.data.users.length-1].email)
        setLastUserType(data.data.users[data.data.users.length-1].type)
        setLastUserImg(data.data.users[data.data.users.length-1].avatar)
        console.log(data.data.users[data.data.users.length-1].avatar)
        
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col-lg-6 mb-4 cardLast">
      <div className="card shadow mb-4">
        <div className="card-header py-3 bgPurple">
          <h5 className="m-0 font-weight-bold centrado bgPurple ">
            TOTAL DE USUARIOS: {userApi}
          </h5>
        </div>
       
        <div className="card-body">
          <h4 className="m-0 font-weight-bold text-gray-800 centrado fontSize ">Ultimo usuario creado</h4><br></br>
        <h5 className="card-title negritaAzul">Nombre<p className='fontGrey'> {lastUser}</p></h5>
        <h5 className="card-title negritaAzul">Email<p className='fontGrey'> {lastUserEmail}</p></h5>
        <h5 className="card-title negritaAzul">Categoria<p className='fontGrey'> {lastUserType}</p></h5>
          <div className="text-center">
            <img src={lastUserImg} alt='avatar' className='centrado'/>
          </div>
          <p>
          </p>

          <Link to={'list'} className="btn btn-info centradoBt">
            <span>Listado completo de usuarios</span>
          </Link>

          <Routes>
            <Route path="list" element={<UserList />} />
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default UserLast;