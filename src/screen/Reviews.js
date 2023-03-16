import React, { Fragment, useEffect, useState, useContext } from "react";
import NavBar from "../Components/NavBar.js";
import SearchBar from "../Components/SearchBar";
import ReviewLine from "../Components/CRUD/ReviewLine";
import ReviewEdit from "../Components/CRUD/ReviewEdit";
import ReviewModal from "../Components/modal/ReviewModal";
import AuthContext from "../context/AuthProvider";
import { getReviews, postReviews, putReviews, deleteReviews, closeBooking } from "../api.js";

function Reviews() {
  const { auth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [reviews, setReviews] = useState([]);
  const [bookingIsChecked, setBookingIsChecked] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [addFormData, setAddFormData] = useState({
    id: "",
    score: "",
    comment: "",
    date: "",
    booking: "",
    author: "",
    recipient: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    score: "",
    comment: "",
    date: "",
    booking: "",
    author: "",
    recipient: "",
  });

  const [editReviewId, setEditReviewId] = useState(null);

  useEffect(() => {
    if (!auth.accessToken) return;
    getReviews(auth.accessToken)
      .then((val) => {
        setReviews(val);
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

    const newReview = {
      score: addFormData.score,
      comment: addFormData.comment,
      date: addFormData.date,
      booking: addFormData.booking,
      author: addFormData.author,
      recipient: addFormData.recipient,
    };

    postReviews(newReview, auth.accessToken)
      .then((res) => {
        const newReview = {
          id: res,
          score: addFormData.score,
          comment: addFormData.comment,
          date: addFormData.date,
          booking: addFormData.booking,
          author: addFormData.author,
          recipient: addFormData.recipient,
        };
        const newReviews = [...reviews, newReview];
        setReviews(newReviews);
        console.log(bookingIsChecked);
        bookingIsChecked && (
          closeBooking(addFormData.booking, auth.accessToken)
        );
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditReviewId(item.id);

    const formValues = {
      id: item.id,
      score: item.score,
      comment: item.comment,
      date: item.date,
      booking: item.booking,
      author: item.author,
      recipient: item.recipient,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedReview = {
      id: editReviewId,
      score: editFormData.score,
      comment: editFormData.comment,
      date: editFormData.date,
      booking: editFormData.booking,
      author: editFormData.author,
      recipient: editFormData.recipient,
    };

    const newReviews = [...reviews];

    const index = reviews.findIndex((item) => item.id === editReviewId);

    newReviews[index] = editedReview;

    putReviews(editedReview, auth.accessToken)
      .then(() => {
        setReviews(newReviews);
        setEditReviewId(null);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  const handleCancelClick = () => {
    setEditReviewId(null);
  };

  const handleDeleteClick = (reviewId) => {
    const newReviews = [...reviews];
    const index = newReviews.findIndex((item) => item.id === reviewId);

    newReviews.splice(index, 1);

    deleteReviews(reviewId, auth.accessToken)
      .then(() => {
        setReviews(newReviews);
      })
      .catch((error) => {
        setErrMsg(error.response?.data.error);
      });
  };

  return (
    <>
      <NavBar tableActive="Reviews" />

      <div className="position">
        <p>{errMsg}</p>
        <h2>Table : Reviews</h2>
        <hr></hr>

        <SearchBar callback={setSearchValue} />
        <div className="overflow-x-auto">
          <form className="hauteur" onSubmit={handleEditFormSubmit}>
            <table className="table table-zebra w-full tableDyna" data-theme="night">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Score</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Booking</th>
                  <th>Author</th>
                  <th>Recipient</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews
                  .filter((review) => review.comment.includes(searchValue))
                  .map((item, index) => {
                    return (
                      <Fragment key={index}>
                        {editReviewId === item.id ? (
                          <ReviewEdit
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        ) : (
                          <ReviewLine
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
        <ReviewModal
          addFormData={addFormData}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
          setBookingIsChecked={setBookingIsChecked}
          bookingIsChecked={bookingIsChecked}
        />
      </div>
    </>
  );
}

export default Reviews;
