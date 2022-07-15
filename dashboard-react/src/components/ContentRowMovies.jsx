import React from 'react';
import CardTotals from './CardTotals';

const ContentRowMovies = () => {
  const cardProps = [
    {
      title: 'TOTAL DE PRODUCTOS',
      color: 'primary',
      quantity: 121,
      icon: 'fas fa-home',
    },
    {
      title: 'TOTAL DE USUARIOS',
      color: 'success',
      quantity: 10,
      icon: 'fas fa-user',
    },
    {
      title: 'TOTAL DE CATEGORIAS',
      color: 'warning',
      quantity: 9,
      icon: 'fas fa-clipboard',
    }
  ];

  return (
    <>
      {/* <!-- Content Row Movies--> */}
      <div className="row">
        {cardProps.map((cardObj, i) => (
          <CardTotals
            title={cardObj.title}
            color={cardObj.color}
            quantity={cardObj.quantity}
            icon={cardObj.icon}
            key={cardObj.title + '-' + i}
          />
        ))}
      </div>
    </>
  );
};

export default ContentRowMovies;
