import React, { useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthProvider';
import {getBookings, getUsers, getLocations} from '../../api'

const AdEdit = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    
    const {auth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState("");
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {

        if(auth.accessToken !== undefined){
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

            getLocations(auth.accessToken).then((val) => {
                setLocations(val);
            }).catch((error) => {
                setErrMsg(error.response?.data.error);
            })
        }
    }, [auth]);

    return(
        <tr key={editFormData.id}>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an id..."
                    name="id"
                    value={editFormData.id}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a title..."
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a content..."
                    name="content"
                    value={editFormData.content}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="date"
                    required="required"
                    placeholder="Enter a creation date..."
                    name="creationdate"
                    value={editFormData.creationdate}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="date"
                    required="required"
                    placeholder="Enter a service date..."
                    name="servicedate"
                    value={editFormData.servicedate}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <select
                    className="select select-bordered"
                    type="text"
                    name="state"
                    required="required"
                    placeholder="Enter a state..."
                    value={editFormData.state}
                    onChange={handleEditFormChange}>
                    <option disabled defaultValue></option>
                    <option>Matin</option>
                    <option>Après-midi</option>
                    <option>Soirée</option>
                    <option>Toute la journée</option>
                </select>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a street name..."
                    name="streetname"
                    value={editFormData.streetname}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter a street number..."
                    name="streetnumber"
                    value={editFormData.streetnumber}
                    onChange={handleEditFormChange}
                ></input>
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
                    type="number"
                    name="zipcodelocation"
                    required="required"
                    placeholder="Enter a zip code..."
                    value={editFormData.zipcodelocation}
                    onChange={handleEditFormChange}>
                    <option disabled selected></option>
                    {
                        locations.map((location, index) => {
                            return(
                                <option key={index}>{location.zipcode}</option>
                            )
                        })
                    }
                </select>
            </td>
            <td>
                <select
                    className="select select-bordered"
                    type="text"
                    name="citylocation"
                    required="required"
                    placeholder="Enter a city..."
                    value={editFormData.citylocation}
                    onChange={handleEditFormChange}>
                    <option disabled selected></option>
                    {
                        locations.map((location, index) => {
                            return(
                                <option key={index}>{location.city}</option>
                            )
                        })
                    }
                </select>
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
                <button type="submit"> Save </button>
                <button type="button" onClick={handleCancelClick}> Cancel </button>

            </td>

        </tr>
    )

};

export default AdEdit;