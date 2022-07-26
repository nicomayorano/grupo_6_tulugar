import React, { useState, useEffect} from 'react';
import TableUser from './TableUser';
import TopBar from '../Dashboard/TopBar';
import Footer from '../Dashboard/Footer';

function UserList (){
    let defoult = [{id:'id usuario', username:'nombre de usuario', email:'email', type:'tipo de categoria'}]

    const [usersL,setUsersL]=useState(defoult)
    useEffect(()=>{
    fetch('http://localhost:3000/api/users')
    .then((result) => result.json())
    .then(data=>{
      setUsersL(data.data.users)
  })
  .catch(err=>console.log(err))
}, [])

return (
  <div className='cardUserList'>
      <TopBar />
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {usersL.map((result, i) => (
                  <TableUser id={result.id} username={result.username} email={result.email} type={result.type} key={result.type + '-' + i}/>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Type</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}


export default UserList;
