import React from "react";
import imgPen from '../../images/whitePencilIcon.png';
import poubelle from '../../images/whiteTrash.png';

const BookingLine = ({ item, handleEditClick, handleDeleteClick }) => {
  
  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.date.slice(0, 10)}</td>
      <td>{item.state}</td>
      <td>{item.user}</td>
      
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

export default BookingLine;
