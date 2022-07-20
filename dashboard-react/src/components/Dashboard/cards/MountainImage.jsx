import React from 'react';
import fondo from '../../../assets/images/index-header-mountain.png'
//import CardTotals from './CardTotals';
//import {useEffect} from 'react';

const MountainImage = () => {

  //const [cardProps, setCardProps] = React.useState([]);

  //useEffect(() => {
   // const endpoint = `http://localhost:3000/api/dashboard`;
   // fetch(endpoint)
   //   .then((response) => response.json())
   //   .then((data) => {
   //     setCardProps(data); 
  //      console.log(data);
   //   });
  //}, []);



/*    const cardProps = [
    {
      title: 'TOTAL DE PRODUCTOS',
      color: 'primary',
      quantity: 125,
      icon: 'fas fa-home',
    },
    {
      title: 'TOTAL DE USUARIOS',
      color: 'success',
      quantity: 22,
      icon: 'fas fa-user',
    },
    {
      title: 'TOTAL DE CATEGORIAS',
      color: 'warning',
      quantity: 12,
      icon: 'fas fa-clipboard',
    }
  ]; */ 

 // return (
   // <>
     // <div className="row">
        //{cardProps.map((cardObj, i) => (
        //  <CardTotals
        //    title={cardObj.title}
        //    color={cardObj.color}
        //    quantity={cardObj.quantity}
        //    icon={cardObj.icon}
        //    key={cardObj.title + '-' + i}
        //  />
       // ))}
      //</div>
   // </>
 // );
//};

return(
  <div className="fondo">
    <img src={fondo} alt='fondo' className="fondoimg"/>
  </div>
)
}

export default MountainImage;
