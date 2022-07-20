import React from 'react';
const TableUser = ({ id, username, email, type }) => {
  return (
    <tr className='tableColor'>
      <th>{id}</th>
      <td>{username}</td>
      <td>{email}</td>
      <td>{type}</td>
    </tr>
    );
};

export default TableUser;