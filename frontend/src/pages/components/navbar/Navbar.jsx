import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "./navigation";
const Navbar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <nav className="bg-zinc-950 flex justify-between px-20 py-7">
      <h1>PERN TASKS</h1>
      <ul className="flex gap-x-2">
        {navigation.map(({ path, name }) => (
          <li
            key={path}
            className={`${
              location.pathname === path && "bg-sky-500 px-1 py-1"
            }`}
          >
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
