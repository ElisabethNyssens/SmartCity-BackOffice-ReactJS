import React, { useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthProvider';
import {getUsers} from '../../api'

const SubscriptionEdit = ({ editFormData, handleEditFormChange, handleCancelClick}) => {
    
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
        <tr key={editFormData.subscriber}>
            <td>
                <select 
                    className="select select-bordered"
                    type="text"
                    name="pseudosubscriber"
                    required="required"
                    placeholder="Enter a pseudo for subscriber..."
                    value={editFormData.pseudosubscriber}
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
                type="text"
                name="pseudosubscription"
                required="required"
                placeholder="Enter a pseudo for subscription..."
                value={editFormData.pseudosubscription}
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

export default SubscriptionEdit;