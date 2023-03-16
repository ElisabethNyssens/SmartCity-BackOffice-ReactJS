import React, { useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthProvider';
import {getUsers} from '../../api'

const BookingEdit = ({ editFormData, handleEditFormChange, handleCancelClick}) => {
    
    const {auth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {

        if(auth.accessToken !== undefined){
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
                    placeholder="Enter an id..."
                    name="id"
                    value={editFormData.id}
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
                    type="text"
                    name="state"
                    required="required"
                    placeholder="Enter a state..."
                    value={editFormData.state}
                    onChange={handleEditFormChange}>
                        <option disabled selected></option>
                        <option>En attente</option>
                        <option>En cours</option>
                        <option>En attente d'approbation</option>
                        <option>Cloturée</option>
                </select>
            </td>

            <td>
                <select 
                    className="select select-bordered"
                    type="text"
                    name="user"
                    required="required"
                    placeholder="Enter a user..."
                    value={editFormData.user}
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

export default BookingEdit;