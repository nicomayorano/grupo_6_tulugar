import React from 'react';

const TableRow = ({ type, province, city , address, price }) => {
  return (
    <tr className='tableColor'>
      <th>{type}</th>
      <td>{province}</td>
      <td>{city}</td>
      <td>{address}</td>
      <td>{price}</td>
    </tr>
  );
};

export default TableRow;
