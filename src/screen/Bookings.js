import React, { Fragment, useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import SearchBar from "../Components/SearchBar";
import BookingModal from "../Components/modal/BookingModal";
import BookingLine from "../Components/CRUD/BookingLine";
import BookingEdit from "../Components/CRUD/BookingEdit";
import AuthContext from "../context/AuthProvider";
import { getBookings, postBookings, putBookings, deleteBookings } from "../api";

function Bookings() {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addFormData, setAddFormData] = useState({
    date: "",
    state: "",
    user: "",
    pseudo: "",
    name: "",
    firstname: "",
    email: "",
    password: "",
    phone: "",
    streetname: "",
    streetnumber: "",
    zipcodelocation: "",
    citylocation: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    date: "",
    state: "",
    user: "",
  });
  const [editBookingId, setEditBookingId] = useState(null);

  useEffect(() => {
    if (!auth.accessToken) return;
    getBookings(auth.accessToken)
      .then((val) => {
        setBookings(val);
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

    const newBookingAPI = {
      date: addFormData.date,
      state: addFormData.state,
      user: addFormData.user,
      pseudo: addFormData.pseudo,
      name: addFormData.name,
      firstName: addFormData.firstname,
      email: addFormData.email,
      password: addFormData.password,
      phone: addFormData.phone,
      streetName: addFormData.streetname,
      streetNumber: addFormData.streetnumber,
      zipCodeLocation: addFormData.zipcodelocation,
      cityLocation: addFormData.citylocation,
    };

    postBookings(newBookingAPI, auth.accessToken)
      .then((res) => {
        const newBooking = {
          id: res,
          date: addFormData.date,
          state: addFormData.state,
          user: addFormData.user || addFormData.pseudo,
        };
        setBookings([...bookings, newBooking]);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditBookingId(item.id);

    const formValues = {
      id: item.id,
      date: item.date,
      state: item.state,
      user: item.user,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBooking = {
      id: editBookingId,
      date: editFormData.date,
      state: editFormData.state,
      ad: editFormData.ad,
      user: editFormData.user,
    };

    const newBookings = [...bookings];

    const index = bookings.findIndex((item) => item.id === editBookingId);

    newBookings[index] = editedBooking;

    setBookings(newBookings);
    setEditBookingId(null);

    putBookings(editedBooking, auth.accessToken)
      .then(() => {
        setBookings(newBookings);
        setEditBookingId(null);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleCancelClick = () => {
    setEditBookingId(null);
  };

  const handleDeleteClick = (bookingId) => {
    const newBookings = [...bookings];
    const index = newBookings.findIndex((item) => item.id === bookingId);

    newBookings.splice(index, 1);

    deleteBookings(bookingId, auth.accessToken)
      .then(() => {
        setBookings(newBookings);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  return (
    <>
      <NavBar tableActive="Bookings" />

      <div className="position">
        <p>{errMsg}</p>

        <h2>Table : Bookings</h2>
        <hr></hr>

        <SearchBar callback={setSearchValue} />
        <div className="overflow-x-auto">
          <form className="hauteur" onSubmit={handleEditFormSubmit}>
            <table className="table table-zebra w-full" data-theme="night">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>State</th>
                  <th>User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((booking) =>
                    booking.user.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <Fragment key={index}>
                        {editBookingId === item.id ? (
                          <BookingEdit
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        ) : (
                          <BookingLine
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
        <BookingModal
          addFormData={addFormData}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
        />
      </div>
    </>
  );
}

export default Bookings;
