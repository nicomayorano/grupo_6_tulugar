import { object } from 'prop-types';
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
 /*const departamento =  productos.filter(product => product.type == 'Departamento');
 const casa =  productos.filter(product => product.type == 'Casa');
 const cabaña =  productos.filter(product => product.type == 'Cabaña');
 const quinta =  productos.filter(product => product.type == 'Quinta');
 const hotel =  productos.filter(product => product.type == 'Hotel');
 const hostel =  productos.filter(product => product.type == 'Hostel');
 const habitacion = productos.filter(product => product.type == 'Habitación'); 
 
  let propierdad = [];
if(`${type}` == "Departamento"){
   propierdad = {...departamento}}
 else if(`${type}` == "Casa"){
  propierdad = {...casa}}
   else if(`${type}` == "Cabaña"){
     return cabaña.map((e) => propierdad.push(...[e])}
     else if(`${type}` == "Quinta"){
       return quinta.map((e) => propierdad.push(...[e])}
       else if(`${type}` == "Hotel"){ 
         return hotel.map((e) => propierdad.push({...[e]})}
           else if(`${type}` == "Hostel"){
           return hostel.map((e) => propierdad.push(...[e])}
           else if(`${type}` == "Habitación"){
             return habitacion.map((e) => propierdad.push(...[e])}
             else{ propierdad ='no hay propiedades disponibles'};*/
             let data = productos.filter(product=> product.type == {type})
              console.log(data);
    return (
   
      <div className="col-lg-6 mb-4 ">
         <div className="card bg-dark text-white shadow">
         <div className="card-body"><h3>{type}</h3></div>
         {/*    {  this.data.map((prop, i)=>(
                <CardProduct propiedades={prop.data} key={prop + '-' + i} />))
          
         }   Lo dejo comentado para que pueda compilar */}
         </div>
      </div>
  )
};

export default CardProduct;
