import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";
import img1 from "../assets/empty-cart.png";

const Cart = () => {
  const [total, setTotal] = useState();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="product-all" style={{ marginTop: "40px" }}>
        <ListGroup>
          {cart.length > 0 ? (
            cart.map((p) => (
              <ListGroup.Item key={p.id}>
                <Row>
                  <Col md={2}>
                    <Image src={p.image} alt={p.name} fluid rounded />
                  </Col>
                  <Col md={2}>{p.name}</Col>
                  <Col md={2}>{p.price}</Col>
                  <Col md={2}>
                    <Rating rating={p.ratings} />
                  </Col>
                  <Col md={2}>
                    <select
                      className="cart-select"
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QUANTITY",
                          payload: {
                            id: p.id,
                            qty: e.target.value,
                          },
                        })
                      }
                      as="select"
                      value={p.qty}
                    >
                      {[...Array(p.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </Col>
                  <Col md={2}>
                    <AiFillDelete
                      fontSize="25px"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: p,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <img src={img1} alt="empty-cart" className="cart-empty-img" />
          )}
        </ListGroup>
      </div>
      <div className="filters" style={{ fontSize: "25px" }}>
        <span>Subtotal ({cart.length} products)</span>
        <span style={{ fontSize: "20px" }}>Total Price : {total} $</span>
        <Button disabled={cart.length === 0}>Procced to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
