import React, { useState, useEffect} from 'react';
import CardProduct from '../Dashboard/cards/CardProduct';
import TopBar from '../Dashboard/TopBar';
import Footer from '../Dashboard/Footer';
import TableCategoria from './TablaCategoria';
function Categories (){
  const [selectValue, setselectValue] = useState('DEFAULT');
  const [products,setProducts]=useState();
  const [productsFilter,setproductsFilter]=useState();
  const [total, setTotal]=useState(0);
  useEffect(()=>{
    fetch('http://localhost:3000/api/products')
    .then((result) => result.json())
    .then(data=>{
     console.log(data.data.products)
      setProducts(data.data.products)
  })
  .catch(err=>console.log(err))
}, [])

  const click = (e) =>{
  if(selectValue=='DEFAULT'){
     alert("Seleccione una categoria");
     return;
  }
  let productFilter= products.filter(x=>x.type==selectValue);
  setTotal(productFilter.length);
  setproductsFilter(productFilter);
}

  return (
    <div className='cardUserList'>
    <TopBar />
  <div className="container-fluid">

  <form className="form-inline">
  <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Seleccione Categoria:</label>
  <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
  onChange={(e) => {setselectValue(e.target.value); console.log(e.target.value)}} value={selectValue} >
    <option value="DEFAULT">Elegir...</option>
    <option value="Departamento">Departamento</option>
    <option value="Casa">Casa</option>
    <option value="Habitación">Habitación</option>
    <option value="Cabaña">Cabaña</option>
    <option value="Quinta">Quinta</option>
    <option value="Hostel">Hostel</option>
    <option value="Hotel">Hotel</option>
    
  </select>

{/*   const departamento =  productos.filter(product => product.type == 'Departamento');
 const casa =  productos.filter(product => product.type == 'Casa');
 const cabaña =  productos.filter(product => product.type == 'Cabaña');
 const quinta =  productos.filter(product => product.type == 'Quinta');
 const hotel =  productos.filter(product => product.type == 'Hotel');
 const hostel =  productos.filter(product => product.type == 'Hostel');
 const habitacion = productos.filter(product => product.type == 'Habitación');  */}

  <button type="button" className="btn btn-primary my-1" onClick={click}>Filtrar</button>
</form>


  
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>           
                <th>Type</th>
                <th>Province</th>
                <th>City</th>
                <th>Address</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
         { 
          (() => {
        if (productsFilter) {
          return (
            productsFilter.map((result, i) => (
                    <TableCategoria  type={result.type} province={result.province} city={result.city} address={result.address} price={result.price} key={result.type + '-' + i}/>
                  ))
          )
        }else {
          return (
            <tr>
            
            <th style={{backgroundColor:"#d1d3e2"}} colSpan="6">Seleccione una Categoria para filtrar</th>
            </tr>
          )
        }
      })()


       }
            </tbody>
            <tfoot>
                <tr>
                  <th colSpan="2">Total Productos: {total}</th>
                  <th></th>
                  {/* <th>Username</th>
                  <th>Email</th>
                  <th>Type</th> */}
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

/*   function Categories (){
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
 Codigo siguiente crea un array solo de categorias que no se repita y lo inyecta en card Products 
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
              
            </div>
          </div>
        </div>
      </div>
    );
  }
 */

export default Categories;
