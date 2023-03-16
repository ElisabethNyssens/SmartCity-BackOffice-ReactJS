import React from "react";

import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { login } from "../api";

function Identification() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clearPassword = JSON.stringify(pwd).replace(/['"]+/g, "");

    try {
      const response = await login(user, clearPassword);
      const { accessToken, status } = response;
      localStorage.setItem("jwt", accessToken);

      setAuth({ pseudo: user, status, accessToken });
      setUser("");
      setPwd("");
      if (status === "manager") {
        navigate("/DashBoard");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="identification">
      <form className="containerForm" onSubmit={handleSubmit}>
        <img src={logo} alt="logo eco-mini" className="w-96"></img>
        <h5 className="font-sans text-5xl font-medium mb-10">Back-Office</h5>
        <div className="form-control">
          <label className="label">
            <span className="label-text" htmlFor="username">
              Pseudo
            </span>
          </label>
          <label className="input-group input-group-vertical">
            <span></span>
            <input
              type="text"
              id="username"
              className="input input-bordered"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text" htmlFor="password">
              Mot de passe
            </span>
          </label>
          <label className="input-group input-group-vertical">
            <span></span>
            <input
              type="password"
              className="input input-bordered"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </label>
        </div>

        <button className="btn btn-wide my-5" onClick={handleSubmit}>
          S'identifier
        </button>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
      </form>
    </div>
  );
}

export default Identification;
