import React from 'react';
import image from '../assets/images/TULUGAR.gif';
import { Routes, Route, Link } from 'react-router-dom';
import GenresInDb from './GenresInDb';
import ContentWrapper from './ContentWrapper';
import Table from './Table';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import SearchMovies from './SearchMovies';
import UserList from './UserList';

const SideBar = () => {
  return (
    <>
      <ul
        className="navbar-nav SideBarBgC sidebar sidebar-dark accordion"
        id="accordionSidebar"
      ><p></p><p></p><p></p><p></p>
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="http://localhost:3000/"
        >
          <div className="sidebar-brand-icon logoTuL">
            <img className="w-100" src={image} alt="logo TuLugar" />
          </div>
        </a>
        {/* <!-- Divider --> */}
        <p></p><p></p><p></p><p></p>
        <hr className="sidebar-divider my-0" />
        <p></p>
        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>MENU</span>
          </Link>
        </li>
        <p></p>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />
        <p></p>
        {/* <!-- Heading --> *}
        <div className="sidebar-heading SideBarBgC2">Menu</div>
        <p></p>
        {/* <!-- Nav Item - Pages --> */}
        
        <li className="nav-item">
          <Link to={'/genres'} className={'nav-link collapsed'}>
            <i className="fas fa-fw fa-folder"></i>
            <span>Categorias</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        <li className="nav-item">
          <Link to={'/charts'} className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Listado Productos</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <Link to={'table'} className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Tables</span>
          </Link>
        </li>
        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <Link to={'search'} className="nav-link">
            <i className="fas fa-fw fa-film"></i>
            <span>Search</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      <Routes>
        <Route path="genres" element={<GenresInDb />} />
        <Route path="charts" element={<ContentRowMovies />} />
        <Route path="table" element={<Table />} />
        <Route path="search" element={<SearchMovies />} />
        <Route path="/" element={<ContentWrapper />} />
        <Route path="list" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default SideBar;
