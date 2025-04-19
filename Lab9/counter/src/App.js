import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  //let products = [];
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:4000/v1/products");
      const data = await response.json();
      setProducts(data.products);
      //products = data.products;
      console.log(products);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("MOUNT STAGE: First Render");
    fetchProducts();
  });
  useEffect(() => {
    console.log("UPDATE STAGE: Re-Render");
    fetchProducts();
  }, [products]);
  useEffect(() => {
    console.log("UNMOUNT STAGE: Final Render");
    return () => {};
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <div>
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.category}</p>
            <a href="/v1/products/{ product.id }/edit">Update Product</a>
            <form
              method="POST"
              action="/v1/products/{ product.id }?_method=delete"
            >
              <button type="submit">Delete Product</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default App;
