import { useState } from 'react';

export default function AddItem({ onAdd }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);

    const formSubmit = (e) => {
        e.preventDefault();
        if (!name || !price || !description) {
            alert("Por favor completa todos los campos");
            return;
        }
        const newProduct = {
            id: Date.now(),
            name,
            price,
            description,
            stock,
        };
        onAdd(newProduct);
        setName("");
        setPrice(0);
        setDescription("");
        setStock(0);
    };

    return (
        <form onSubmit={formSubmit}>
            <input type="text" 
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)} />
            <input type="number"
            placeholder="Precio del producto"
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">
            agregar
        </button>
        </form>
    );
}
