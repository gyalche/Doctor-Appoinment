import React from 'react';
import '../styles/LayoutStyles.css';
import { SidebarMenu, adminMenu } from './data/data';
import Link from 'antd/es/typography/Link';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  //rendering menu list;
  const menu = user?.isAdmin ? adminMenu : SidebarMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {menu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-item ${isActive ? 'active' : ''}`}>
                    <i className={menu.icons}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Link to="/profile">{user?.name}</Link>
                <i class="fa-solid fa-bell"></i>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
