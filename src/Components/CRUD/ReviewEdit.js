import React, { useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthProvider';
import {getBookings, getUsers} from '../../api';

const ReviewEdit = ({ editFormData, handleEditFormChange, handleCancelClick}) => {
    
    const {auth} = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState("");
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (auth.accessToken !== undefined){
            getBookings(auth.accessToken).then((val) => {
                setBookings(val);
            }).catch((error) => {
                setErrMsg(error.response?.data.error);
            })

            getUsers(auth.accessToken).then((val) => {
                setUsers(val);
            }).catch((error) => {
                setErrMsg(error.response?.data.error);
            })
        }
    }, [auth]);

    return (
        <tr key={editFormData.id}>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an Id..."
                    name="id"
                    value={editFormData.id}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter a score..."
                    name="score"
                    min="1"
                    max="5"
                    value={editFormData.score}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a comment..."
                    name="comment"
                    value={editFormData.comment}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="date"
                    required="required"
                    placeholder="Enter a date..."
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <select 
                    className="select select-bordered" 
                    type="number"
                    name="booking"
                    placeholder="Enter a booking..."
                    value={editFormData.booking}
                    onChange={handleEditFormChange}>
                    <option disabled selected></option>
                    {
                            bookings.map((booking, index) => {
                            return(
                                <option key={index}>{booking.id}</option>
                            )
                        })  
                        }
                </select>
            </td>

            <td>
            <select 
                className="select select-bordered" 
                name="author"
                required="required"
                placeholder="Enter an author..."
                value={editFormData.author}
                onChange={handleEditFormChange}>
                <option disabled selected></option>
                {
                        users.map((user, index) => {
                        return(
                            <option key={index}>{user.pseudo}</option>
                        )
                    })  
                    }
            </select>
            </td>
                    
            <td>
            <select 
                className="select select-bordered" 
                required="required"
                placeholder="Enter a recipient..."
                name="recipient"
                value={editFormData.recipient}
                onChange={handleEditFormChange}>
                <option disabled selected></option>
                {
                        users.map((user, index) => {
                        return(
                            <option key={index}>{user.pseudo}</option>
                        )
                    })  
                    }
            </select>
            </td>

            <td>
                <button type="submit"> Save </button>
                <button type="button" onClick={handleCancelClick}> Cancel </button>
            </td>
        </tr>
    )
}

export default ReviewEdit;