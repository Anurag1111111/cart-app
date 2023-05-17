import React from "react";
import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const Filter = () => {
  const {
    productstate: { byStock, byFastdelivery, sort, byRating, bySearch },
    productdispatch,
  } = CartState();
  console.log(byStock, byFastdelivery, sort, byRating, bySearch);

  return (
    <div className="filters mt-4">
      <h5 className="pb-4 text-center">Filter Products</h5>
      <span>
        <Form.Check
          inline
          name="radio-1"
          type="radio"
          aria-label="radio 1"
          label="Ascending"
          onChange={() =>
            productdispatch({
              type: "FILTER_BY_PRICE",
              payload: "hightolow",
            })
          }
          checked={sort === "hightolow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          name="radio-1"
          type="radio"
          aria-label="radio 1"
          label="Descending"
          onChange={() =>
            productdispatch({
              type: "FILTER_BY_PRICE",
              payload: "lowtohigh",
            })
          }
          checked={sort === "lowtohigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          name="check-1"
          type="checkbox"
          aria-label="radio 1"
          label="Remove Out of Stock"
          onChange={() => productdispatch({ type: "FILTER_BY_STOCK" })}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          name="check-1"
          type="checkbox"
          aria-label="radio 1"
          label="Fast Delivery Products"
          onChange={() => productdispatch({ type: "FILTER_BY_DELIVERY" })}
          checked={byFastdelivery}
        />
      </span>
      <span>
        <label className="mx-2">Rating : </label>
        <Rating
          onClick={(i) =>
            productdispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          rating={byRating}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        onClick={() =>
          productdispatch({ type: "CLEAR_FILTERS", payload: sort })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filter;
