import React from 'react';
import {useEffect, useState} from 'react';
import UserList from './UserList';
import { Routes, Route, Link } from 'react-router-dom';

function UserLast(){
  const [userApi, setUserApi] = useState(0);
  const [lastUser, setLastUser] = useState('');
  const [lastUserEmail, setLastUserEmail] = useState('');
  const [lastUserType, setLastUserType] = useState('');
  const [lastUserImg, setLastUserImg] = useState('');
 
  useEffect(()=>{
    fetch("http://localhost:3000/api/userApi")
      .then((res) => res.json())
      .then((data) => {
        setUserApi(data.meta.total);
        setLastUser(data.data.users[data.data.users.length-1].username)
        setLastUserEmail(data.data.users[data.data.users.length-1].email)
        setLastUserType(data.data.users[data.data.users.length-1].type)
        setLastUserImg(data.data.users[data.data.users.length-1].avatar)
        console.log('hola')
        console.log(lastUserImg)
        console.log(data.data.users[data.data.users.length-1])
        
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3 bgPurple">
          <h5 className="m-0 font-weight-bold text-gray-800 centrado  ">
            TOTAL DE USUARIOS: {userApi}
          </h5>
        </div>
       
        <div className="card-body">
          <h4 className="m-0 font-weight-bold text-gray-800 centrado ">Ultimo usuario creado</h4><br></br>
        <h5 class="card-title negritaAzul">Nombre: {lastUser}</h5>
        <h5 class="card-title negritaAzul">Email: {lastUserEmail}</h5>
        <h5 class="card-title negritaAzul">Categoria: {lastUserType}</h5>
          <div className="text-center">
            <img src={lastUserImg} alt='avatar'></img>
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