import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 2, 3, 4, 5]),
    fastdelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));
  console.log(products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productstate, productdispatch] = useReducer(productReducer, {
    byStock: false,
    byFastdelivery: false,
    byRating: 0,
    bySearch: "",
    sort: false,
  });

  return (
    <Cart.Provider value={{ state, dispatch, productstate, productdispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
