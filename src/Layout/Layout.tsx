import React from 'react';
import { NavLink, Outlet } from 'react-router';

const Layout = () => {
    return (
        <>
        <div className='flex justify-center gap-[30px] my-[20px]'>
            <NavLink className={({ isActive }) => isActive ? "text-3xl mr-5 text-[red]" : "text-3xl mr-5 text-[blue]"} to={"/"}>Zustand</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-3xl mr-5 text-[red]" : "text-3xl mr-5 text-[blue]"} to={"/redux"}>Redux</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-3xl mr-5 text-[red]" : "text-3xl mr-5 text-[blue]"} to={"/jotai"}>Jotai</NavLink>
        </div>
        <Outlet/>
        </>
    );
}

export default Layout;
