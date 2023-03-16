import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getLocations } from "../../api";

function UserModal({ addFormData, handleAddFormChange, handleAddFormSubmit }) {
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

  const [newLocationIsChecked, setNewLocationIsChecked] = useState(false);

  const handleChange = () => {
    setNewLocationIsChecked(!newLocationIsChecked);
  };

  return (
    <>
      <label htmlFor="my-modal-5" className="btn">
        Ajout user
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form className="containerForm" onSubmit={handleAddFormSubmit}>
            <legend>Users</legend>
            <p>{errMsg}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pseudo</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="text"
                  name="pseudo"
                  required="required"
                  placeholder="Enter a pseudo..."
                  value={addFormData.pseudo}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="text"
                  name="name"
                  required="required"
                  placeholder="Enter a name..."
                  value={addFormData.name}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="text"
                  name="firstname"
                  required="required"
                  placeholder="Enter a first name..."
                  value={addFormData.firstname}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="email"
                  name="email"
                  required="required"
                  placeholder="Enter an email..."
                  value={addFormData.email}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="password"
                  name="password"
                  required="required"
                  placeholder="Enter a password..."
                  value={addFormData.password}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="tel"
                  name="phone"
                  required="required"
                  pattern="[0-9]{4}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}"
                  placeholder="Enter a phone number..."
                  value={addFormData.phone}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Street name</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="text"
                  name="streetname"
                  required="required"
                  placeholder="Enter a street name..."
                  value={addFormData.streetname}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Street number</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="number"
                  name="streetnumber"
                  required="required"
                  placeholder="Enter a street number..."
                  value={addFormData.streetnumber}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            {newLocationIsChecked ? (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Zip code</span>
                  </label>
                  <label className="input-group">
                    <input
                      className="input input-bordered"
                      type="number"
                      name="zipcodelocation"
                      required="required"
                      placeholder="Enter a zip code..."
                      value={addFormData.zipcodelocation}
                      onChange={handleAddFormChange}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <label className="input-group">
                    <input
                      className="input input-bordered"
                      type="text"
                      name="citylocation"
                      required="required"
                      placeholder="Enter a city..."
                      value={addFormData.citylocation}
                      onChange={handleAddFormChange}
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Zip code location</span>
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
                    <span className="label-text">City location</span>
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
              </>
            )}

            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  value={newLocationIsChecked}
                  onChange={handleChange}
                  name="checked"
                />
                <span className="label-text">New location</span>
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

export default UserModal;
