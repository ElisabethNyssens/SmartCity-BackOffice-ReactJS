import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getLocations } from "../../api";

function LocationModal({ addFormData, handleAddFormChange, handleAddFormSubmit }) {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (auth.accessToken !== undefined) {
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
      <label htmlFor="my-modal-5" className="btn">
        Ajout location
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form className="containerForm" onSubmit={handleAddFormSubmit}>
            <legend>Location</legend>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Zip code</span>
              </label>
              <label className="input-group">
                <select
                  className="select select-bordered"
                  type="number"
                  name="zipcodelocation"
                  required="required"
                  placeholder="Enter a zip code..."
                  value={addFormData.zipcodelocation}
                  onChange={handleAddFormChange}
                >
                  <option disabled></option>
                  {locations.map((location, index) => {
                    return <option key={index}>{location.zipcode}</option>;
                  })}
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <label className="input-group">
                <select
                  className="select select-bordered"
                  type="text"
                  name="citylocation"
                  required="required"
                  placeholder="Enter a city..."
                  value={addFormData.citylocation}
                  onChange={handleAddFormChange}
                >
                  <option disabled></option>
                  {locations.map((location, index) => {
                    return <option key={index}>{location.city}</option>;
                  })}
                </select>
              </label>
            </div>

            <div className="containerBtn">
              <div className="modal-action">
                <label htmlFor="my-modal-5" className="btn">
                  Retour
                </label>
              </div>
              <div className="modal-action">
                <button className="btn" type="submit">
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LocationModal;
