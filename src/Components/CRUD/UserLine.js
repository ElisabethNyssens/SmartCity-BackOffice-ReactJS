import React from 'react';
import imgPen from '../../images/whitePencilIcon.png';
import poubelle from '../../images/whiteTrash.png';

const UserLine = ({ item, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={item.pseudo}>
            <td>{item.pseudo}</td>
            <td>{item.name}</td>
            <td>{item.firstname}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.nbpearls}</td>
            <td>{item.helpcounter}</td>
            <td>{item.description}</td>
            <td>{item.streetname}</td>
            <td>{item.streetnumber}</td>
            <td>{item.isadmin ? "administrateur" : "pas administrateur"}</td>
            <td>{item.zipcodelocation}</td>
            <td>{item.citylocation}</td>
            <td>
                <div>
                    <button
                    type="button"
                    onClick={(event) => handleEditClick(event, item)}>
                        <img id="imgPenDark" src={imgPen} alt=""/>

                    </button>
                    
                    <button type="button" onClick={()=> handleDeleteClick(item.pseudo)}>
                        <img id="poubelle" src={poubelle} alt=""/>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserLine;