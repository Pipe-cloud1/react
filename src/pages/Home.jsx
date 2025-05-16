import React, { useState, useEffect } from 'react';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';
import CheckoutSidebar from '../pages/Checkout';

function Home() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    fetch('https://front2.nsideas.cl/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('shoppingList');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems(preItem => {
      let verif = false;
      let newItems = [];

      for (let i = 0; i < preItem.length; i++) {
        if (preItem[i].id === product.id) {
          verif = true;
          const sum = preItem[i].quantity + 1;
          const newQuantity = sum > product.stock ? product.stock : sum;
          newItems.push({
            id: preItem[i].id,
            name: preItem[i].name,
            price: preItem[i].price,
            stock: preItem[i].stock,
            quantity: newQuantity
          });
        } else {
          newItems.push(preItem[i]);
        }
      }

      if (!verif) {
        newItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          quantity: 1
        });
      }

      return newItems;
    });
  };

  const deleteItem = (id) => {
    const filteredItems = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id !== id) {
        filteredItems.push(items[i]);
      }
    }
    setItems(filteredItems);
  };

  const updateQty = (id, newQuantity) => {
    const updatedItems = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        let qty = newQuantity;
        if (qty < 1) qty = 1;
        if (qty > item.stock) qty = item.stock;
        updatedItems.push({
          id: item.id,
          name: item.name,
          price: item.price,
          stock: item.stock,
          quantity: qty
        });
      } else {
        updatedItems.push(item);
      }
    }
    setItems(updatedItems);
  };

  const quantitiesMap = {};
  for (let i = 0; i < items.length; i++) {
    quantitiesMap[items[i].id] = items[i].quantity;
  }

  return (
    <div className="relative p-6 max-w-4xl mx-auto bg-black min-h-screen">
      <button
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        onClick={() => setShowCheckout(!showCheckout)}
      >
        {showCheckout ? '🛒' : '🛒'}
      </button>

      <h1 className="text-2xl font-bold mb-6 text-white">Lista de Compras</h1>
      <AddItem products={products} quantities={quantitiesMap} onAdd={addToCart} />
      <ItemList items={items} onDelete={deleteItem} onUpdateQuantity={updateQty} />

      {showCheckout && (
        <CheckoutSidebar
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          items={items}
          customerName={customerName}
          setCustomerName={setCustomerName}
        />
      )}
    </div>
  );
}

export default Home;
