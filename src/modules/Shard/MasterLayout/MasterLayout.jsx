import React from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function MasterLayout({user}) {
  return (
    <div className="d-flex">
      <div className="">
        <SideBar />
      </div>
      <div className="w-100 ">
        <NavBar userdata={user} />
        <Outlet />
      </div>
    </div>
  );
}
