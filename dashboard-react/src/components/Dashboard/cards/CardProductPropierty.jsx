import React from 'react'
import CardProducts from "./CardProduct";

const CardProductPropierty = ({propiedades}) => {
 /*  console.log(propiedades)*/

    return (
        <div className="container-fluid">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                     
                      <th>Province</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr className='tableColor'>
     {/* <td>{propiedades.province}</td>
      <td>{propiedades.city}</td>
      <td>{propiedades.address}</td>
      <td>{propiedades.price}</td>*/}
    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Province</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>Price</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
      
}
export default CardProductPropierty;