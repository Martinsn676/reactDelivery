import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ProductProps } from "./product";

interface CartContext {
  cart: ProductProps[];
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

export function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } =
    useOutletContext<CartContext>();

  const totalPrice = cart.reduce(
    (sum, product) =>
      sum + (product.discountedPrice ?? product.price) * product.quantity,
    0
  );

  // If cart is empty
  if (cart.length === 0) {
    return (
      <CartContainer>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <h1>Your Cart</h1>
      {cart.map((product) => (
        <CartItem key={product.id}>
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
          />
          <div>
            <h2>{product.title}</h2>
            <p>
              Price:{" "}
              {product.discountedPrice?.toFixed(2) ?? product.price.toFixed(2)}{" "}
              kr
              <br />
            </p>
            <ButtonGroup>
              <AdjustButton onClick={() => decreaseQuantity(product.id)}>
                -
              </AdjustButton>
              {product.quantity}
              <AdjustButton onClick={() => increaseQuantity(product.id)}>
                +
              </AdjustButton>
            </ButtonGroup>
          </div>
        </CartItem>
      ))}
      <TotalContainer>
        <h2>Total Price: {totalPrice.toFixed(2)} kr</h2>
      </TotalContainer>

      <CheckoutButton to="/CheckoutConfirmation">
        <button>Proceed to Checkout</button>
      </CheckoutButton>
    </CartContainer>
  );
}

const CheckoutButton = styled(Link)`
  text-decoration: none;
  margin: 10px auto;
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const AdjustButton = styled.button`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const TotalContainer = styled.div`
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
`;
