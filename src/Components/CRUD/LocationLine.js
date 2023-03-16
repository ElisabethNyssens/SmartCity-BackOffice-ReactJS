import React from "react";
import poubelle from "../../images/whiteTrash.png";

const LocationLine = ({ item, handleDeleteClick }) => {
  return (
    <tr key={item.city}>
      <td>{item.zipcode}</td>
      <td>{item.city}</td>
      <td>
        <div>
          <button
            type="button"
            onClick={() => handleDeleteClick(item.zipcode, item.city)}
          >
            <img id="poubelle" src={poubelle} alt="" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LocationLine;
