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
    fetch('http://localhost:3001/api/genres')
      .then((data) => data.json())
      .then((genres) => {
        this.setState({ genresList: genres.data });
      });
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
              Genres in Data Base
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              {this.state.genresList.map((genero) => (
                <CardMovie genre={genero.name} key={genero.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenresInDb;
