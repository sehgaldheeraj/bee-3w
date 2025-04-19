import { useState, useEffect } from "react";
import Product from "./product";

function Products() {
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
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
}

export default Products;
