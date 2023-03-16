import React, { Fragment, useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import LocationLine from "../Components/CRUD/LocationLine";
import SearchBar from "../Components/SearchBar";
import LocationModal from "../Components/modal/LocationModal";
import AuthContext from "../context/AuthProvider";
import { getLocations, postLocations, deleteLocations } from "../api.js";

function Locations() {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [locations, setLocations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addFormData, setAddFormData] = useState({
    zipcode: "",
    city: "",
  });

  useEffect(() => {
    if (!auth.accessToken) return;
    getLocations(auth.accessToken)
      .then((val) => {
        setLocations(val);
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

    const newLocation = {
      zipcode: addFormData.zipcode,
      city: addFormData.city,
    };

    const newLocationAPI = {
      zipCode: addFormData.zipcode,
      city: addFormData.city,
    };

    const newLocations = [...locations, newLocation];

    postLocations(newLocationAPI, auth.accessToken)
      .then(() => {
        setLocations(newLocations);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleDeleteClick = (zipCode, city) => {
    const newLocations = [...locations];
    const index = newLocations.findIndex((item) => item.zipcode === zipCode && item.city === city);

    newLocations.splice(index, 1);

    deleteLocations(zipCode, city, auth.accessToken)
      .then(() => {
        setLocations(newLocations);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  return (
    <>
      <NavBar tableActive="Locations" />

      <div className="position">
        <p>{errMsg}</p>

        <h2>Table : Locations</h2>
        <hr></hr>

        <SearchBar callback={setSearchValue} />
        <div className="overflow-x-auto">
          <form className="hauteur">
            <table className="table table-zebra w-full" data-theme="night">
              <thead>
                <tr>
                  <th>ZipCode</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations
                  .filter((location) =>
                    location.city.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <Fragment key={index}>
                        {<LocationLine item={item} handleDeleteClick={handleDeleteClick} />}
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </form>
        </div>

        <LocationModal
          addFormData={addFormData}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
        />
      </div>
    </>
  );
}

export default Locations;
