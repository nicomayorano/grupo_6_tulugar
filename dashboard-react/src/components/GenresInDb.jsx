import React from 'react';
import CardMovie from './CardMovie';

class GenresInDb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genresList: [],
    };
  }

  componentDidMount() {
    this.setState({ genresList: [
      {name:"Departamento", cantidad:30, id:1},
    {name:"Casa", cantidad:43, id:2},
    {name:"Cabaña", cantidad:19, id:3},
    {name:"Quinta", cantidad:5, id:4},
    {name:"Hotel", cantidad:23, id:5},
    {name:"Habitacion", cantidad:120, id:6},
    {name:"Hostel", cantidad:70, id:7}] });
   /*  fetch('http://localhost:3001/api/genres')
      .then((data) => data.json())
      .then((genres) => {
        this.setState({ genresList: genres.data });
      }); */
  }
  changeFondo() {
    let h5 = document.querySelector('.fondito');
    h5.classList.toggle('bg-secondary');
  }
  render() {
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
              {this.state.genresList.map((genero) => (
                <CardMovie genre={genero.name} quantity={genero.cantidad} key={genero.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenresInDb;
