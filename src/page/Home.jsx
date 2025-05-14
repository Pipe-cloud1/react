import React, { useState, useEffect } from "react";
import AddItem from "../components/AddItem";
import ItemList from "../components/ItemList";

export function Home() {
    const [products, setProducts] = useState([]);


//leer la api y guardar en localstorage
    useEffect(() => {
        const saveproducts = JSON.parse(localStorage.getItem("products"));
        if (saveproducts) {
            setProducts(saveproducts); 
        } else {
            const fetchProducts = async () => {
            try {
                const response = await fetch("https://front2.nsideas.cl/api/products");
                const data = await response.json();
                setProducts(data);
              localStorage.setItem("products", JSON.stringify(data));
          } catch (error) {
              console.error("Error de fectchin en la API", error);
          }
          }
          fetchProducts();
        }
    }, []);


//agregar producto
    const Addtocart = (newProduct) => {
        const updateproducts = [...products, newProduct];
        setProducts(updateproducts);
        localStorage.setItem("products", JSON.stringify(updateproducts));
    };

    
//eliminar producto
    const DeleteProduct = (id) => {
        const updateproducts = products.filter((product) => product.id !== id);
        setProducts(updateproducts);
        localStorage.setItem("products", JSON.stringify(updateproducts));
    };



    //agregar producto y lista de productos
  return (
    <div className="p-4">

      <h1 className="text-xl font-bold mb-4">Lista de Compras</h1>
      <AddItem onAdd={Addtocart} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <ItemList products={products} DeleteProduct={DeleteProduct} />
      </div>

    </div>
  );
}