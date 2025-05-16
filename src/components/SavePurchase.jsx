import React, { useState, useEffect } from "react";
import Summary from "../components/Summary";
import Button from "../components/Button";

function SavePurchase({ items, customerName }) {
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    var calculatedTotal = 0;
    for (var i = 0; i < items.length; i++) {
      calculatedTotal += items[i].price * items[i].quantity;
    }
    setTotal(calculatedTotal);
  }, [items]);

  function isValidName(name) {
    if (name === undefined || name === null) {
      return false;
    }
    if (name.trim().length > 0) {
      return true;
    }
    return false;
  }

  function saveClientCart() {
    if (!isValidName(customerName)) {
      setMessage("Ingrese nombre del cliente.");
      return;
    }

    if (!(items instanceof Array) || items.length === 0) {
      setMessage("No hay productos en el carrito.");
      return;
    }

    var data = {
      clientName: customerName.trim(),
      total: total,
      items: []
    };

    for (var j = 0; j < items.length; j++) {
      data.items.push({
        id: items[j].id,
        quantity: items[j].quantity,
        price: items[j].price
      });
    }

    setLoading(true);
    setMessage("");

    fetch("https://front2.nsideas.cl/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        setLoading(false);
        return response.json().then(function (resData) {
          if (response.ok) {
            setMessage("Compra guardada con éxito.");
          } else {
            setMessage("Error al guardar la compra: " + JSON.stringify(resData));
          }
        });
      })
      .catch(function (error) {
        setLoading(false);
        setMessage("Error al guardar la compra: " + error.message);
      });
  }

  var buttonText = loading ? "Guardando..." : "Guardar compra";

  var buttonClass = "px-4 py-2 rounded text-white ";
  if (loading) {
    buttonClass += "bg-gray-500 cursor-not-allowed";
  } else {
    buttonClass += "bg-green-600 hover:bg-green-700";
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded shadow">
      <Summary items={items} customerName={customerName} />
      <div className="mt-4">
        <Button onClick={saveClientCart} disabled={loading} className={buttonClass}>
          {buttonText}
        </Button>
      </div>
      {message && <p className="mt-3 text-yellow-400">{message}</p>}
    </div>
  );
}

export default SavePurchase;
