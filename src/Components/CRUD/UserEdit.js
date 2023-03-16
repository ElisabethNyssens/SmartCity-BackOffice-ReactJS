import React, { useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthProvider';
import {getLocations} from '../../api'

const UserEdit = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    
    const {auth} = useContext(AuthContext);

    const [locations, setLocations] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {

        if(auth.accessToken !== undefined){
            getLocations(auth.accessToken).then((val) => {
                setLocations(val);
            }).catch((error) => {
                setErrMsg(error.response?.data.error);
            })
        }
    }, [auth]);

    return (
        <tr key={editFormData.pseudo}>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a pseudo..."
                    name="pseudo"
                    value={editFormData.pseudo}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a first name..."
                    name="firstname"
                    value={editFormData.firstname}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="email"
                    required="required"
                    placeholder="Enter an email..."
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="tel"
                    required="required"
                    placeholder="Enter a phone number..."
                    name="phone"
                    pattern="[0-9]{4}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}"
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter a number of pearls..."
                    name="nbpearls"
                    value={editFormData.nbpearls}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter a number of help..."
                    name="helpcounter"
                    min="0"
                    max="3"
                    value={editFormData.helpcounter}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    placeholder="Enter a description..."
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                ></input>
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
                <input
                    type="text"
                    required="required"
                    placeholder="Enter true or false"
                    name="isadmin"
                    value={editFormData.isadmin}
                    onChange={handleEditFormChange}
                ></input>
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
                <button type="submit"> Save </button>
                <button type="button" onClick={handleCancelClick}> Cancel </button>
            </td>
        </tr>

    )
}

export default UserEdit;