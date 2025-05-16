import React from 'react';

function ItemList({ items, onDelete, onUpdateQuantity }) {
  return (
    <div className="mt-6 space-y-4">
      {items.length === 0 ? (
        <p className="text-gray-400">Vacio.</p>
      ) : (
        items.map((item, index) => {
          const quantity = item.quantity || 1;
          const stock = item.stock || 10;

          return (
            <div
              key={`${item.id}-${index}`} 
              className="flex justify-between items-center p-4 bg-gray-800 border border-white rounded-2xl shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-gray-300">Precio: ${item.price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 bg-gray-700 rounded-xl text-white disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-white w-8 text-center">{quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                  disabled={quantity >= stock}
                  className="px-3 py-1 bg-gray-700 rounded-xl text-white disabled:opacity-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onDelete(item.id)}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                Eliminar
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ItemList;
