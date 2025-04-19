import React from "react";

const Product = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <p>{product.price}</p>
      <p>{product.quantity}</p>
      <p>{product.category}</p>
      <a href="/v1/products/{ product.id }/edit">Update Product</a>
      <form method="POST" action="/v1/products/{ product.id }?_method=delete">
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default Product;
