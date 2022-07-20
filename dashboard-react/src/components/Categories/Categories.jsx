import React, { useState, useEffect} from 'react';
import CardProduct from '../Dashboard/cards/CardProduct';

/*class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
    };
  }

  componentDidMount() {
   /* this.setState({ genresList: [
      {name:"Departamento", cantidad:30, id:1},
    {name:"Casa", cantidad:43, id:2},
    {name:"Cabaña", cantidad:19, id:3},
    {name:"Quinta", cantidad:5, id:4},
    {name:"Hotel", cantidad:23, id:5},
    {name:"Habitacion", cantidad:120, id:6},
    {name:"Hostel", cantidad:70, id:7}] });*/
    
    /*fetch('http://localhost:3000/api/products')
      .then((data) => data.json())
      .then((data) => {
        this.setState({ categoryList: data.type });
        console.log(data.data.type)
      }); 
  }
  changeFondo() {
    let h5 = document.querySelector('.fondito');
    h5.classList.toggle('bg-secondary');
  }
  {this.categoryList.map((data, i) => (
                <CardProduct type={data}  key={data.type+ '-' + i} />
              ))}*/
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
  return categories.indexOf(ele) == pos;
}) 
/*El Codigo que sigue busca cantidad de elementos con la misma categoria*/ 

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
               }  
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Categories;
