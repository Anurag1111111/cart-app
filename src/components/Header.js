import React from "react";
import { Link } from "react-router-dom";

import { AiFillDelete, AiOutlineShoppingCart } from "react-icons/ai";
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { CartState } from "../context/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productdispatch,
  } = CartState();
  return (
    <Navbar bg="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link className="brand" to="/cart-app">
            Shopping App
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search..."
            className="m-auto"
            onChange={(e) =>
              productdispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          ></FormControl>
        </Navbar.Text>
        <Nav>
          <Dropdown drop="start">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <AiOutlineShoppingCart className="fs-4 mx-2" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {cart.length > 0 ? (
                <>
                  {cart.map((p) => (
                    <div className="cart-item" key={p.id}>
                      <img className="cart-image" src={p.image} alt={p.name} />
                      <div className="cart-detail mt-2">
                        <p className="mb-0">{p.name}</p>
                        <p>{p.price}</p>
                      </div>
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
                    </div>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "90%", marginLeft: "20px" }}>
                      Go to Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <Dropdown.Item>Cart is Empty</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
