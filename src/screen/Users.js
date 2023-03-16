import React, { Fragment, useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import SearchBar from "../Components/SearchBar";
import UserModal from "../Components/modal/UserModal";
import UserLine from "../Components/CRUD/UserLine";
import UserEdit from "../Components/CRUD/UserEdit";
import AuthContext from "../context/AuthProvider";
import { getUsers, postUsers, patchUsers, deleteUsers } from "../api.js";

function Users() {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addFormData, setAddFormData] = useState({
    pseudo: "",
    name: "",
    firstname: "",
    email: "",
    phone: "",
    nbpearls: "",
    helpcounter: "",
    description: "",
    streetname: "",
    streetnumber: "",
    isadmin: "",
    zipcodelocation: "",
    citylocation: "",
  });
  const [editFormData, setEditFormData] = useState({
    pseudo: "",
    name: "",
    firstname: "",
    email: "",
    phone: "",
    nbpearls: "",
    helpcounter: "",
    description: "",
    streetname: "",
    streetnumber: "",
    isadmin: "",
    zipcodelocation: "",
    citylocation: "",
  });

  const [editUserPseudo, setEditUserPseudo] = useState(null);

  useEffect(() => {
    if (!auth.accessToken) return;
    getUsers(auth.accessToken)
      .then((val) => {
        setUsers(val);
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

    const newUser = {
      pseudo: addFormData.pseudo,
      name: addFormData.name,
      firstname: addFormData.firstname,
      email: addFormData.email,
      phone: addFormData.phone,
      nbpearls: 0,
      helpcounter: 0,
      description: "",
      streetname: addFormData.streetname,
      streetnumber: addFormData.streetnumber,
      isadmin: false,
      zipcodelocation: addFormData.zipcodelocation,
      citylocation: addFormData.citylocation,
    };

    const newUserAPI = {
      pseudo: addFormData.pseudo,
      name: addFormData.name,
      firstname: addFormData.firstname,
      email: addFormData.email,
      phone: addFormData.phone,
      password: addFormData.password,
      streetName: addFormData.streetname,
      streetNumber: addFormData.streetnumber,
      zipCodeLocation: addFormData.zipcodelocation,
      cityLocation: addFormData.citylocation,
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);

    postUsers(newUserAPI, auth.accessToken)
      .then(() => {
        setUsers(newUsers);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditUserPseudo(item.pseudo);

    const formValues = {
      pseudo: item.pseudo,
      name: item.name,
      firstname: item.firstname,
      email: item.email,
      phone: item.phone,
      nbpearls: item.nbpearls,
      helpcounter: item.helpcounter,
      description: item.description,
      streetname: item.streetname,
      streetnumber: item.streetnumber,
      isadmin: item.isadmin,
      zipcodelocation: item.zipcodelocation,
      citylocation: item.citylocation,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const submitUser = {
      pseudo: editUserPseudo,
      name: editFormData.name,
      firstname: editFormData.firstname,
      email: editFormData.email,
      phone: editFormData.phone,
      nbPearls: editFormData.nbpearls,
      helpCounter: editFormData.helpcounter,
      description: editFormData.description,
      streetName: editFormData.streetname,
      streetNumber: parseInt(editFormData.streetnumber),
      isAdmin: editFormData.isadmin,
      zipCodeLocation: editFormData.zipcodelocation,
      cityLocation: editFormData.citylocation,
    };

    const editedUser = {
      pseudo: editUserPseudo,
      name: editFormData.name,
      firstname: editFormData.firstname,
      email: editFormData.email,
      phone: editFormData.phone,
      nbpearls: editFormData.nbpearls,
      helpcounter: editFormData.helpcounter,
      description: editFormData.description,
      streetname: editFormData.streetname,
      streetnumber: parseInt(editFormData.streetnumber),
      isadmin: editFormData.isadmin,
      zipcodelocation: editFormData.zipcodelocation,
      citylocation: editFormData.citylocation,
    };

    const newUsers = [...users];

    const index = users.findIndex((item) => item.pseudo === editUserPseudo);

    newUsers[index] = editedUser;

    patchUsers(submitUser, auth.accessToken)
      .then(() => {
        setUsers(newUsers);
        setEditUserPseudo(null);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleCancelClick = () => {
    setEditUserPseudo(null);
  };

  const handleDeleteClick = (userPseudo) => {
    const newUsers = [...users];
    const index = newUsers.findIndex((item) => item.pseudo === userPseudo);

    newUsers.splice(index, 1);
    deleteUsers(userPseudo, auth.accessToken)
      .then(() => {
        setUsers(newUsers);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  return (
    <>
      <NavBar tableActive="Users" />

      <div className="position">
        <p>{errMsg}</p>
        <h2>Table : Users</h2>
        <hr></hr>

        <SearchBar callback={setSearchValue} />
        <div className="overflow-x-auto">
          <form className="hauteur" onSubmit={handleEditFormSubmit}>
            <table className="table table-zebra w-full tableDyna" data-theme="night">
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Name</th>
                  <th>FirstName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>NbPearls</th>
                  <th>HelpCounter</th>
                  <th>Description</th>
                  <th>StreetName</th>
                  <th>StreetNumber</th>
                  <th>IsAdmin</th>
                  <th>ZipCodeLocation</th>
                  <th>cityLocation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => user.pseudo.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((item, index) => {
                    return (
                      <Fragment key={index}>
                        {editUserPseudo === item.pseudo ? (
                          <UserEdit
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        ) : (
                          <UserLine
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

        <UserModal
          addFormData={addFormData}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
        />
      </div>
    </>
  );
}

export default Users;
