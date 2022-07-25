import React, { Component,  useState, useEffect} from 'react';
import TableRow from './TableRow';
import TopBar from '../Dashboard/TopBar';
import Footer from '../Dashboard/Footer';

function Table (){
  let defoult = [{type:'tipo de propiedad', province: 'Provincia en que esta ubicada', ciudad:'Ciudad'}]
  const [products,setProducts]=useState(defoult)

   useEffect(()=>{
    fetch('http://localhost:3000/api/products')
    .then((result) => result.json())
    .then(data=>{
      setProducts(data.data.products)
  })
  .catch(err=>console.log(err))
}, [])
      

    return (
      <div>
      <TopBar />
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Type</th>
                    <th>Province</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((result, i) => (
                    <TableRow id={result.id} type={result.type} province={result.province} city={result.city} address={result.address} price={result.price} key={result.type + '-' + i}/>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Type</th>
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
        <Footer />
      </div>
      </div>
    );
  }


export default Table;
