import React, { Fragment, useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import SearchBar from "../Components/SearchBar";
import SubscriptionLine from "../Components/CRUD/SubscriptionLine";
import SubscriptionModal from "../Components/modal/SubscriptionModal";
import AuthContext from "../context/AuthProvider";
import { getSubscriptions, postSubscriptions, deleteSubscriptions } from "../api";

function Subscriptions() {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addFormData, setAddFormData] = useState({
    pseudosubscriber: "",
    pseudosubscription: "",
  });

  useEffect(() => {
    if (!auth.accessToken) return;
    getSubscriptions(auth.accessToken)
      .then((val) => {
        setSubscriptions(val);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  }, [auth]);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newSubscription = {
      pseudosubscriber: addFormData.pseudosubscriber,
      pseudosubscription: addFormData.pseudosubscription,
    };

    const newSubscriptionAPI = {
      pseudoSubscriber: addFormData.pseudosubscriber,
      pseudoSubscription: addFormData.pseudosubscription,
    };

    const newSubscriptions = [...subscriptions, newSubscription];
    postSubscriptions(newSubscriptionAPI, auth.accessToken)
      .then((res) => {
        setSubscriptions(newSubscriptions);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleDeleteClick = (subscriber, subscription) => {
    const newSubscriptions = [...subscriptions];
    const index = newSubscriptions.findIndex(
      (item) => item.pseudosubscriber === subscriber && item.pseudosubscription === subscription
    );

    newSubscriptions.splice(index, 1);

    deleteSubscriptions(subscriber, subscription, auth.accessToken)
      .then(() => {
        setSubscriptions(newSubscriptions);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  return (
    <>
      <NavBar tableActive="Subscriptions" />

      <div className="position">
        <p>{errMsg}</p>
        <h2>Table : Subscriptions</h2>
        <hr></hr>

        <SearchBar callback={setSearchValue} />
        <div className="overflow-x-auto">
          <form className="hauteur">
            <table className="table table-zebra w-full" data-theme="night">
              <thead>
                <tr>
                  <th>PseudoSubscriber</th>
                  <th>PseudoSubscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions
                  .filter((subscription) =>
                    subscription.pseudosubscriber.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <Fragment key={index}>
                        {<SubscriptionLine item={item} handleDeleteClick={handleDeleteClick} />}
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </form>
        </div>
        <SubscriptionModal
          addFormData={addFormData}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
        />
      </div>
    </>
  );
}

export default Subscriptions;
