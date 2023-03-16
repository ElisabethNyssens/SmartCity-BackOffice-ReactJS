import React from "react";
import poubelle from "../../images/whiteTrash.png";

const SubscriptionLine = ({ item, handleDeleteClick }) => {
  return (
    <tr key={item.pseudosubscriber}>
      <td>{item.pseudosubscriber}</td>
      <td>{item.pseudosubscription}</td>
      <td>
        <div>
          <button
            type="button"
            onClick={() =>
              handleDeleteClick(item.pseudosubscriber, item.pseudosubscription)
            }
          >
            <img id="poubelle" src={poubelle} alt="" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SubscriptionLine;
