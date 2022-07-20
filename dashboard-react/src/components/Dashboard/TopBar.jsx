import React from 'react';
import adminImage from '../../assets/images/admin.webp';

const TopBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow TopBarBg">DASHBOARD
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>

        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
         
         
         {/*
          { <!-- Nav Item - Alerts --> }
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="alertsDropdown"
            >
              <i className="fas fa-bell fa-fw"></i>
              { <!-- Counter - Alerts -->}
              <span className="badge badge-danger badge-counter">3+</span>
            </a>
          </li>

          { Nav Item - Messages }
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="messagesDropdown"
            >
              <i className="fas fa-envelope fa-fw"></i>
               <!-- Counter - Messages -->
              <span className="badge badge-danger badge-counter">7</span>
            </a>
          </li>
        */}
          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow TopBarBgB">
            <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
              <span className="mr-2 d-none d-lg-inline text-white-600 small">
                Administrador
              </span>
              <img
                className="img-profile rounded-circle"
                src={adminImage}
                alt="Administrador TuLugar"
                width="60"
              />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopBar;
