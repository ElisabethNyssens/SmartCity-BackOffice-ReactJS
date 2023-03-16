import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getUsers } from "../../api";

function SubscriptionModal({ addFormData, handleAddFormChange, handleAddFormSubmit }) {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (auth.accessToken !== undefined) {
      getUsers(auth.accessToken)
        .then((val) => {
          setUsers(val);
        })
        .catch((error) => {
          setErrMsg(error.response?.data.error);
        });
    }
  }, [auth]);

  return (
    <>
      <label htmlFor="my-modal-5" className="btn">
        Ajout subscription
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form className="containerForm" onSubmit={handleAddFormSubmit}>
            <legend>Subscription</legend>
            <p>{errMsg}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pseudo subscriber</span>
              </label>
              <select
                className="select select-bordered"
                type="text"
                name="pseudosubscriber"
                required="required"
                placeholder="Enter a pseudo for subscriber..."
                value={addFormData.pseudosubscriber}
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
                <span className="label-text">Pseudo subscription</span>
              </label>
              <select
                className="select select-bordered"
                type="text"
                name="pseudosubscription"
                required="required"
                placeholder="Enter a pseudo for subscription..."
                value={addFormData.pseudosubscription}
                onChange={handleAddFormChange}
              >
                <option disabled></option>
                {users.map((user, index) => {
                  return <option key={index}>{user.pseudo}</option>;
                })}
              </select>
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

export default SubscriptionModal;
