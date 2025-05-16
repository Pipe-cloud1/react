import React from "react";
import Summary from "../components/Summary";
import SavePurchase from "../components/SavePurchase";

function CheckoutSidebar({ isOpen, onClose, items, customerName, setCustomerName }) {
  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-xl font-bold">Checkout</h2>
        <button onClick={onClose} className="text-red-400 hover:text-red-600">Cerrar</button>
      </div>

      <div className="p-4 space-y-4">
        <input
          type="text"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          placeholder="Ingresa tu nombre"
          className="w-full p-2 rounded bg-gray-800 text-white border border-white"
        />
        <SavePurchase items={items} customerName={customerName} />
      </div>
    </div>
  );
}

export default CheckoutSidebar;
