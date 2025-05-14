import React from 'react'

export default function ItemList({ products, DeleteProduct }) {
    return (
        <aside>
            <ul>
                {products.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow mb-4">
                        <div>
                            <strong>{item.name}</strong> - ${item.price}
                        <footer className="mt-2 flex justify-between items-center">
                            ${item.stock} unidades
                            <button onClick={() => DeleteProduct(item.id)}>Eliminar</button>
                        </footer>
                        </div>
                    </li>
                ))}
            </ul>   
        </aside>
    );
}