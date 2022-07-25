import React, { useState, useEffect} from 'react';
import CardProduct from '../Dashboard/cards/CardProduct';


  function Categories (){
    let defoult = [{type:'Quinta de Campo'}]
    const [category,setCategory]=useState(defoult)
  
     useEffect(()=>{
      fetch('http://localhost:3000/api/products')
      .then((result) => result.json())
      .then(data=>{
        setCategory(data.data.products)
    })
    .catch(err=>console.log(err))
  }, [])
  /* Codigo siguiente crea un array solo de categorias que no se repita y lo inyecta en card Products*/ 
  let allProducts = [];
  let categories = [];

 allProducts= [...category]

 allProducts.map((data, i)=>(
  allProducts.join(data.type)
  ));

allProducts.map((data) =>(
  categories.push(data.type)
));
const filteredCategories = categories.filter(function(ele , pos){
  return categories.indexOf(ele) === pos;
}) 
/*El Codigo que sigue busca cantidad de elementos con la misma categoria*/ 
let productos = [...category]
const departamento =  productos.filter(product => product.type === 'Departamento');
const casa =  productos.filter(product => product.type === 'Casa');
const cabaña =  productos.filter(product => product.type === 'Cabaña');
const quinta =  productos.filter(product => product.type === 'Quinta');
const hotel =  productos.filter(product => product.type === 'Hotel');
const hostel =  productos.filter(product => product.type === 'Hostel');
const habitacion = productos.filter(product => product.type === 'Habitación'); 



    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5
              onMouseOver={() => this.changeFondo()}
              onMouseLeave={() => this.changeFondo()}
              className="m-0 font-weight-bold text-gray-800 fondito"
            >
              Cantidad de productos por Categorias
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
            { filteredCategories.map((data, i)=>(
                <CardProduct type={data} key={data + '-' + i} />
            ) )
               },
               {
                < CardProduct departamento={departamento}  casa={casa}  cabaña={cabaña}  quinta={quinta} hotel={hotel}  hostel={hostel}  habitacion={habitacion} />                    
               }
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Categories;
