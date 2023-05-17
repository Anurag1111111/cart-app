import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";

const Home = () => {
  const {
    state: { products },
    productstate: { byStock, byFastdelivery, sort, byRating, bySearch },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "hightolow" ? a.price - b.price : b.price - a.price
      );
    }

    if (byStock) {
      sortedProducts = sortedProducts.filter((p) => p.inStock);
    }

    if (byFastdelivery) {
      sortedProducts = sortedProducts.filter((p) => p.fastdelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((p) => p.ratings >= byRating);
    }

    if (bySearch) {
      sortedProducts = sortedProducts.filter((p) =>
        p.name.toLowerCase().includes(bySearch)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="product-all">
        {transformProducts().map((product) => {
          return <SingleProduct product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
