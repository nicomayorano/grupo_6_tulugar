import React from 'react';
import image from '../assets/images/TULUGARbajo.gif';
import { Routes, Route, Link } from 'react-router-dom';
import Categories from './Categories/Categories';
import ContentWrapper from './Dashboard/ContentWrapper';
import Table from './Products/Table';
import ContentRowProducts from './Dashboard/cards/ContentRowProducts';
import NotFound from './NotFound';
import SearchPropierty from './SearchPropierty';

const SideBar = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="Digital House" />
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - Tu Lugar</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Menu</div>

        {/* <!-- Nav Item - Pages --> */}
        <li className="nav-item">
          <Link to={'/categories'} className={'nav-link collapsed'}>
            <i className="fas fa-fw fa-folder"></i>
            <span>Categorias</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        <li className="nav-item">
<<<<<<< HEAD
          <Link to={'/charts'} className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span> informacion sobre: </span>
=======
          <Link to={'/products'} className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Listado Productos</span>
>>>>>>> 9b9cc6067b772b9cb773bfba73325c9479ed869b
          </Link>
        </li>

        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <Link to={'table'} className="nav-link">
<<<<<<< HEAD
            <i className="fas fa-fw fa-table"></i>
            <span>Listado Productos</span>
=======
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Tables</span>
>>>>>>> 9b9cc6067b772b9cb773bfba73325c9479ed869b
          </Link>
        </li>
        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <Link to={'search'} className="nav-link">
            <i className="fas fa-fw fa-film"></i>
            <span>Search Propierty</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      <Routes>
<<<<<<< HEAD
        <Route path="genres" element={<GenresInDb />} />
        <Route path="charts" element={<ContentRowMovies />} />
        <Route path="table" element={<Table />} />
        <Route path="search" element={<SearchPropierty />} />
=======
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Table />} />
        <Route path="table" element={<ContentRowProducts />} />
        <Route path="search" element={<SearchMovies />} />
>>>>>>> 9b9cc6067b772b9cb773bfba73325c9479ed869b
        <Route path="/" element={<ContentWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default SideBar;
