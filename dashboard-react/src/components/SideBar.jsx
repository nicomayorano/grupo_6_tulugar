import React from 'react';
import image from '../assets/images/TULUGAR.gif';
import { Routes, Route, Link } from 'react-router-dom';
import Categories from './Categories/Categories';
import ContentWrapper from './Dashboard/ContentWrapper';
import Table from './Products/Table';
import NotFound from './NotFound';
import UserList from './Users/UserList';


const SideBar = () => {
  return (
    <>
      <ul className="navbar-nav SideBarBgC sidebar sidebar-dark accordion"
        id="accordionSidebar"><p></p><p></p><p></p><p></p>
        {/* <!-- Sidebar - Brand --> */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center"
          href="http://localhost:3000/">
          <div className="sidebar-brand-icon logoTuL">
            <img className="w-100" src={image} alt="logo TuLugar" />
          </div>
        </a><p></p><p></p><p></p><p></p>
        <hr className="sidebar-divider my-0" /><p></p>
        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>MENU</span>
          </Link>
        </li><p></p>
        <hr className="sidebar-divider" /><p></p>
        {/* <!-- Nav Item - Listado Productos --> */}
        <li className="nav-item">
          <Link to={'table'} className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Listado Productos</span>
          </Link>
        </li>
        {/* <!-- Nav Item - listado usuario --> */}
        <li className="nav-item">
          <Link to={'list'} className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span> Listado Usuarios </span>
          </Link>
        </li>
        {/* <!-- Nav Item - Categorias --> */}
        <li className="nav-item">
          <Link to={'/categories'} className={'nav-link collapsed'}>
            <i className="fas fa-fw fa-folder"></i>
            <span>Categorias</span>
          </Link>
        </li>
        </ul>
      <Routes>
        <Route path="categories" element={<Categories />} />
        <Route path="list" element={<UserList />} />
        <Route path="table" element={<Table />} />
        <Route path="/" element={<ContentWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    
    </>
  );
};

export default SideBar;
