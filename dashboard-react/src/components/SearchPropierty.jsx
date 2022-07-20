import React, { useState, useEffect, useRef } from 'react';

function SearchPropierty() {
  const [propierty, setPropierty] = useState(['']);
  const [search, setSearch] = useState('Bariloche');
  const inputSearch = useRef();

  const keyword = 'PROPIEDAD DEMO';

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setPropierty([...data.Search]);
        } else {
          setPropierty([]);
        }
      });
  }, [search]);

  const searchPropierty = (e) => {
    e.preventDefault();
    const value = inputSearch.current.value;
    setSearch(value);
    inputSearch.current.value = '';
  };
  // Credenciales de API
  // Intenta poner cualquier cosa antes para probar

  return (
    <div className="container-fluid">
      
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador */}
              <form method="GET" onSubmit={searchPropierty}>
                <div className="form-group">
                  <label htmlFor="">Buscar por Ciudad:</label>
                  <input
                    ref={inputSearch}
                    type="text"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-info">Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Propiedades en la Ciudad: {keyword}</h2>
            </div>
            {/* Listado de películas */}
            {propierty.length > 0 &&
              propierty.map((prop, i) => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" key={i}>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">
                          {prop.city}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            src={prop.imag}
                            alt={prop.type}
                            style={{
                              width: '90%',
                              height: '400px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <p>{prop.address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {propierty.length === 0 && (
            <div className="alert alert-warning text-center">
              No se encontraron Propiedades
            </div>
          )}
        </>
    </div>
  );
}

export default SearchPropierty;
