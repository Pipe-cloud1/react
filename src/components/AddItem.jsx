import React from 'react';
import Button from './Button'; // Ajusta la ruta si está en otra carpeta

function AddItem({ products, quantities, onAdd }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(function (product) {
        let currentQty = 0;
        if (quantities[product.id] !== undefined) {
          currentQty = quantities[product.id];
        }

        let max = false;
        if (currentQty >= product.stock) {
          max = true;
        }

        let buttonText = 'Agregar';
        if (max) {
          buttonText = 'Agotado';
        }

        let buttonStyle = 'bg-blue-600 hover:bg-blue-700';
        if (max) {
          buttonStyle = 'bg-gray-600 cursor-not-allowed';
        }

        return (
          <div key={product.id} className="p-4 bg-gray-800 border border-white rounded-2xl">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-gray-300">Precio: ${product.price}</p>
            <p className="text-sm text-gray-400">Stock disponible: {product.stock}</p>
            <p className="text-sm font-semibold mt-1 text-white">Carrito: {currentQty}</p>
            <Button
              onClick={function () {
                onAdd(product);
              }}
              disabled={max}
              className={buttonStyle}
            >
              {buttonText}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default AddItem;
