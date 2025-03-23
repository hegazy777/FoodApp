import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from "../../../assets/3.png";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <Sidebar onClick={toggleCollapse} collapsed={collapsed}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
        <Menu>
          <MenuItem  icon={<i className="fa fa-home"></i>} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem icon={<i className="fa fa-user"></i>} component={<Link to="/dashboard/users" />}>
            Users
          </MenuItem>
          <MenuItem icon={<i className="fa fa-list"></i>} component={<Link to="/dashboard/RecipeList" />}>
            Recipes
          </MenuItem>
          <MenuItem icon={<i className="fa fa-th-large"></i>} component={<Link to="/dashboard/CategoryList" />}>
            Category
          </MenuItem>
          <MenuItem  onClick={logout} icon={<i className="fa fa-th-large"></i>} >
          Log Out 
          </MenuItem>
        </Menu>
      </Sidebar>

    </div>
  );
}
