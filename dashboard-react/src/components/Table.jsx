import React, { Component } from 'react';
import TableRow from './TableRow';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
    };
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/movies')
      .then((data) => data.json())
      .then((movies) => {
        this.setState({ moviesList: movies.data });
      });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Duración</th>
                    <th>Rating</th>
                    <th>Género</th>
                    <th>Premios</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.moviesList.map((data) => (
                    <TableRow {...data} />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Título</th>
                    <th>Duración</th>
                    <th>Rating</th>
                    <th>Género</th>
                    <th>Premios</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
