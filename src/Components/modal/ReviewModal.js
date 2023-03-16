import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getBookings, getUsers } from "../../api";

function ReviewModal({ addFormData, handleAddFormChange, handleAddFormSubmit, setBookingIsChecked, bookingIsChecked }) {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

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
    }
  }, [auth]);

  const handleChangeBooking = () => {
    setBookingIsChecked(!bookingIsChecked);
  };

  return (
    <>
      <label htmlFor="my-modal-5" className="btn">
        Ajout review
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form className="containerForm" onSubmit={handleAddFormSubmit}>
            <legend>Review</legend>
            <p>{errMsg}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Score</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="number"
                  name="score"
                  min="1"
                  max="5"
                  required="required"
                  placeholder="Enter a score..."
                  value={addFormData.score}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <label className="input-group">
                <textarea
                  className="textarea textarea-bordered"
                  type="text"
                  name="comment"
                  required="required"
                  placeholder="Enter a comment..."
                  value={addFormData.comment}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <label className="input-group">
                <input
                  className="input input-bordered"
                  type="date"
                  name="date"
                  required="required"
                  placeholder="Enter a date..."
                  value={addFormData.date}
                  onChange={handleAddFormChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Booking</span>
              </label>
              <select
                className="select select-bordered"
                type="text"
                name="booking"
                required="required"
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
                type="text"
                name="author"
                required="required"
                placeholder="Enter a user..."
                value={addFormData.user}
                onChange={handleAddFormChange}
              >
                <option disabled></option>
                {users.map((user, index) => {
                  return <option key={index}>{user.pseudo}</option>;
                })}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipient</span>
              </label>
              <select
                className="select select-bordered"
                type="text"
                name="recipient"
                required="required"
                placeholder="Enter a user..."
                value={addFormData.user}
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
                    value={bookingIsChecked}
                    onChange={handleChangeBooking}
                    name="checked"
                />
                <span className="label-text">New booking</span>
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

export default ReviewModal;
