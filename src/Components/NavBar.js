import React from "react";
import logo from "../images/logo-light.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar({ tableActive }) {
  const navigate = useNavigate();
  const tables = ["Users", "Locations", "Bookings", "Ads", "Reviews", "Subscriptions"];

  return (
    <div className="navbar bg-base-300" data-theme="night">
      <div className="menuFixed">
        <ul className="menu bg-base-100 w-56">
          <li className={tableActive === "DashBoard" ? "bordered" : "hover-bordered"}>
            <Link to={`/DashBoard`} className="collapse-title text-xl font-medium ">
              Tableau de bord
            </Link>
          </li>
          <div tabIndex={0}>
            <li className={tableActive === "Tables" ? "bordered" : "hover-bordered"}>
              <Link to={`/Tables`}>Tables</Link>
            </li>
            {tables.map((name) => {
              return (
                <li className={name === tableActive ? "bordered" : "hover-bordered"} key={name}>
                  <Link to={`/Tables/${name}`}>{name}</Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
      <div className="navbar bg-base-300">
        <div className="flex-1 lg:flex-none">
          <img id="imgLogo" src={logo} alt="EcoMini" className="px-3"></img>
          <h4>Back-office</h4>
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn btn-profil">
                Profil
              </label>
              <ul tabIndex={0} className="menu dropdown-content p-2 bg-base-100 rounded-box">
                <li
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    navigate("/");
                  }}
                >
                  <button>Déconnexion</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
