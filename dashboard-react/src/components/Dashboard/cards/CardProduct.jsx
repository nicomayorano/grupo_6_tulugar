import { object } from 'prop-types';
import React, { useState, useEffect} from 'react';
import CardProductPropierty from './CardProductPropierty';

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
 const departamento =  productos.filter(product => product.type == 'Departamento');
 const casa =  productos.filter(product => product.type == 'Casa');
 const cabaña =  productos.filter(product => product.type == 'Cabaña');
 const quinta =  productos.filter(product => product.type == 'Quinta');
 const hotel =  productos.filter(product => product.type == 'Hotel');
 const hostel =  productos.filter(product => product.type == 'Hostel');
 const habitacion = productos.filter(product => product.type == 'Habitación'); 
 
   let propiedades = [];

   
   if({type}== 'Departamento'){
    departamento.map((propiedad, i) => propiedades.push())
   }
   console.log(propiedades)

/*if(type == 'Departamento'){
  return propiedades = {...departamento}};
  
/*else if(`${type}` == "Casa"){
  propierdad = {...casa}}
   else if(`${type}` == "Cabaña"){
     return cabaña.map((e) => propierdad.push(...[e])}
     else if(`${type}` == "Quinta"){
       
             else{ propierdad ='no hay propiedades disponibles'};
             /* let data = productos.filter(product=> product.type == {type})*/
             
    return (
   
      <div className="col-lg-6 mb-4 ">
         <div className="card bg-dark text-white shadow">
         <div className="card-body"><h3>{type}</h3></div>
            {/*{ `this.` + `${type}`+`.map`((prop, i)=>(
                <CardProductPropierty propiedades={prop} key={prop + '-' + i} />))
          
         }   */}
         {<CardProductPropierty />}
         </div>
      </div>
  )
};

export default CardProduct;
