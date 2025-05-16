import React from "react";

function Summary({ items, customerName }) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }

  return (
    <div className="text-white">
      <p className="text-lg font-semibold">Cliente: {customerName || "Sin nombre"}</p>
      <p className="text-lg font-semibold">Total: ${total}</p>
    </div>
  );
}

export default Summary;

