import React, { useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import AuthContext from "../context/AuthProvider";
import { getUsers, getAds, getLocations } from "../api";

function DashBoard() {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [ads, setAds] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!auth.accessToken) {
      return;
    } else {
      getUsers(auth.accessToken)
        .then((val) => {
          setUsers(val);
        })
        .catch((error) => {
          setErrMsg(error.response?.data.error);
        });

      getAds(auth.accessToken)
        .then((val) => {
          setAds(val);
        })
        .catch((error) => {
          setErrMsg(error.response?.data.error);
        });

      getLocations(auth.accessToken)
        .then((val) => {
          setLocations(val);
        })
        .catch((error) => {
          setErrMsg(error.response?.data.error);
        });
    }
  }, [auth]);

  return (
    <>
      <NavBar tableActive="DashBoard" />
      <div className="position" data-theme="light">
        <h2>Tableau de bord</h2>
        <hr></hr>
        <div className="stats shadow">
          <div className="artboard artboard-horizontal phone-1">
            <div className="stat-title">Utilisateurs</div>
            <div className="stat-value">{users.length}</div>
          </div>

          <div className="artboard artboard-horizontal phone-1">
            <div className="stat-title">Annonces postées</div>
            <div className="stat-value">{ads.length}</div>
          </div>

          <div className="artboard artboard-horizontal phone-1">
            <div className="stat-title">Nombre de villes concernées</div>
            <div className="stat-value">{locations.length}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
