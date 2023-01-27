import React from 'react';
import '../styles/LayoutStyles.css';
import { SidebarMenu, adminMenu } from './data/data';
import Link from 'antd/es/typography/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  //doctor menu;
  const doctorMenu = [
    {
      name: `Home`,
      path: `/`,
      icons: `fa-solid fa-house`,
    },
    {
      name: `Appoinments`,
      path: `/appoinments`,
      icons: `fa-solid fa-list`,
    },

    {
      name: `Profile`,
      path: `/doctor/profile/${user?._id}`,
      icons: `fa-solid fa-user`,
    },
  ];

  //rendering menu list;
  const menu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : SidebarMenu;

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
                <Badge
                  onClick={() => navigate('/notification')}
                  count={user && user?.notification.length}>
                  <i class="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
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
