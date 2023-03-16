import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getBookings, getUsers, getLocations } from "../../api";

function AdModal({
  addFormData,
  handleAddFormChange,
  handleAddFormSubmit,
  setAuthorIsChecked,
  authorIsChecked,
}) {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (auth.accessToken !== undefined) {
      getBookings(auth.accessToken)
        .then((val) => {
          setBookings(val);
        })
        .catch((error) => {
          setErrMsg(error.response?.data.error);
        });

      getUsers(auth.accessToken)
        .then((val) => {
          setUsers(val);
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

  const [newLocationIsChecked, setNewLocationIsChecked] = useState(false);
  const handleChange = () => {
    setNewLocationIsChecked(!newLocationIsChecked);
  };

  const handleChangeAuthor = () => {
    setAuthorIsChecked(!authorIsChecked);
  };
  return (
    <>
      <label htmlFor="my-modal-5" className="btn">
        Ajout ad
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form className="containerForm" onSubmit={handleAddFormSubmit}>
            <legend>Ad</legend>
            <p>{errMsg}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="text"
                  name="title"
                  required="required"
                  placeholder="Enter a title..."
                  value={addFormData.title}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="text"
                  name="content"
                  required="required"
                  placeholder="Enter a content..."
                  value={addFormData.content}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">CreationDate</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="date"
                  name="creationdate"
                  required="required"
                  placeholder="Enter a creation date..."
                  value={addFormData.creationdate}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ServiceDate</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="date"
                  name="servicedate"
                  required="required"
                  placeholder="Enter a service date..."
                  value={addFormData.servicedate}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <select
                className="select select-bordered"
                type="text"
                name="availability"
                required="required"
                placeholder="Enter a state..."
                value={addFormData.availability}
                onChange={handleAddFormChange}
              >
                <option disabled defaultValue></option>
                <option>Matin</option>
                <option>Après-midi</option>
                <option>Soirée</option>
                <option>Toute la journée</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bookings</span>
              </label>
              <select
                className="select select-bordered"
                type="number"
                name="booking"
                placeholder="Enter a booking..."
                value={addFormData.booking}
                onChange={handleAddFormChange}
              >
                <option disabled></option>
                {bookings.map((booking, index) => {
                  return <option key={index}>{booking.id}</option>;
                })}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <select
                className="select select-bordered"
                name="author"
                required="required"
                placeholder="Enter an author..."
                value={addFormData.author}
                onChange={handleAddFormChange}
              >
                <option disabled></option>
                {users.map((user, index) => {
                  return <option key={index}>{user.pseudo}</option>;
                })}
              </select>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  value={authorIsChecked}
                  onChange={handleChangeAuthor}
                />
                <span className="label-text">Use author's address</span>
              </label>
            </div>

            {!authorIsChecked ? (
              <>
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
              </>
            ) : (
              <></>
            )}
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

export default AdModal;
