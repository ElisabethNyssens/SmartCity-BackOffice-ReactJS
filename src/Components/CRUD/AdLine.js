import React from "react";
import imgPen from '../../images/whitePencilIcon.png';
import poubelle from '../../images/whiteTrash.png';

const AdLine = ({ item, handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.content}</td>
      <td>{item.creationdate.slice(0, 10)}</td>
      <td>{item.servicedate.slice(0, 10)}</td>
      <td>{item.availability}</td>
      <td>{item.streetname}</td>
      <td>{item.streetnumber}</td>
      <td>{item.author}</td>
      <td>{item.zipcodelocation}</td>
      <td>{item.citylocation}</td>
      <td>{item.booking}</td>
      <td>
        <div>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, item)}>
            <img id="imgPenDark" src={imgPen} alt=""/>

          </button>
          
          
          <button type="button" onClick={()=> handleDeleteClick(item.id)}>
            <img id="poubelle" src={poubelle} alt=""/>
          </button>
          </div>
        
         </td> 
    </tr>
  );
};

export default AdLine;