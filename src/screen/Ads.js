import React, { Fragment, useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import SearchBar from "../Components/SearchBar";
import AdModal from "../Components/modal/AdModal";
import AdLine from "../Components/CRUD/AdLine";
import AdEdit from "../Components/CRUD/AdEdit";
import AuthContext from "../context/AuthProvider";
import { getAds, postAds, patchAds, deleteAds, getUsers, getAdById } from "../api.js";

function Ads() {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [authorIsChecked, setAuthorIsChecked] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [addFormData, setAddFormData] = useState({
    title: "",
    content: "",
    creationdate: "",
    servicedate: "",
    availability: "",
    streetname: "",
    streetnumber: "",
    author: "",
    zipcodelocation: "",
    citylocation: "",
    booking: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
    content: "",
    creationdate: "",
    servicedate: "",
    availability: "",
    streetname: "",
    streetnumber: "",
    author: "",
    zipcodelocation: "",
    citylocation: "",
    booking: "",
  });

  const [editAdId, setEditAdId] = useState(null);

  useEffect(() => {
    if (!auth.accessToken) return;
    getAds(auth.accessToken)
      .then((val) => {
        setAds(val);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });

    getUsers(!auth.accessToken)
      .then((user) => {
        setUsers(user);
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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newAdAPI = {
      title: addFormData.title,
      content: addFormData.content,
      creationDate: addFormData.creationdate,
      serviceDate: addFormData.servicedate,
      availability: addFormData.availability,
      streetName: addFormData.streetname,
      streetNumber: addFormData.streetnumber,
      author: addFormData.author,
      zipCodeLocation: addFormData.zipcodelocation,
      cityLocation: addFormData.citylocation,
      booking: addFormData.booking,
      shouldUseAuthorAddress: authorIsChecked,
    };

    postAds(newAdAPI, auth.accessToken)
      .then((res) => {
        getAdById(res, auth.accessToken).then((ad) => {
          setAds([...ads, ad]);
        });
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditAdId(item.id);

    const formValues = {
      id: item.id,
      title: item.title,
      content: item.content,
      creationdate: item.creationdate,
      servicedate: item.servicedate,
      availability: item.availability,
      streetname: item.streetname,
      streetnumber: item.streetnumber,
      author: item.author,
      zipcodelocation: item.zipcodelocation,
      citylocation: item.citylocation,
      booking: item.booking,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const submitAd = {
      id: editAdId,
      title: editFormData.title,
      content: editFormData.content,
      creationDate: editFormData.creationdate,
      serviceDate: editFormData.servicedate,
      availability: editFormData.availability,
      streetName: editFormData.streetname,
      streetNumber: parseInt(editFormData.streetnumber),
      author: editFormData.author,
      zipCodeLocation: editFormData.zipcodelocation,
      cityLocation: editFormData.citylocation,
      booking: editFormData.booking,
    };

    const editedAd = {
      id: editAdId,
      title: editFormData.title,
      content: editFormData.content,
      creationdate: editFormData.creationdate,
      servicedate: editFormData.servicedate,
      availability: editFormData.availability,
      streetname: editFormData.streetname,
      streetnumber: parseInt(editFormData.streetnumber),
      author: editFormData.author,
      zipcodelocation: editFormData.zipcodelocation,
      citylocation: editFormData.citylocation,
      booking: editFormData.booking,
    };

    const newAds = [...ads];

    const index = ads.findIndex((item) => item.id === editAdId);

    newAds[index] = editedAd;

    patchAds(submitAd, auth.accessToken)
      .then(() => {
        setAds(newAds);
        setEditAdId(null);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };
  const handleCancelClick = () => {
    setEditAdId(null);
  };

  const handleDeleteClick = (adId) => {
    const newAds = [...ads];
    const index = newAds.findIndex((item) => item.id === adId);

    newAds.splice(index, 1);

    deleteAds(adId, auth.accessToken)
      .then(() => {
        setAds(newAds);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  return (
    <>
      <NavBar tableActive="Ads"></NavBar>

      <div className="position">
        <p>{errMsg}</p>
        <h2>Table : Ads</h2>
        <hr></hr>

        <SearchBar callback={setSearchValue} />
        <div className="overflow-x-auto">
          <form className="hauteur" onSubmit={handleEditFormSubmit}>
            <table className="table table-zebra w-full tableDyna" data-theme="night">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>CreationDate</th>
                  <th>ServiceDate</th>
                  <th>Availability</th>
                  <th>streetName</th>
                  <th>StreetNumber</th>
                  <th>Author</th>
                  <th>ZipCodeLocation</th>
                  <th>cityLocation</th>
                  <th>Booking</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads
                  .filter((ad) => ad.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((item, index) => {
                    return (
                      <Fragment key={index}>
                        {editAdId === item.id ? (
                          <AdEdit
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        ) : (
                          <AdLine
                            item={item}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                          />
                        )}
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </form>
        </div>
        <AdModal
          addFormData={addFormData}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
          setAuthorIsChecked={setAuthorIsChecked}
          authorIsChecked={authorIsChecked}
        />
      </div>
    </>
  );
}

export default Ads;
