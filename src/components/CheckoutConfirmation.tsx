import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ProductProps } from "./product";

interface CartContext {
  cart: ProductProps[];
  clearCart: () => void;
}

export function CheckoutConfirmation() {
  const { cart, clearCart } = useOutletContext<CartContext>();
  const [localCart, setLocalCart] = useState<ProductProps[]>([]);

  const navigate = useNavigate();

  const totalPrice = localCart.reduce(
    (sum, product) =>
      sum + (product.discountedPrice ?? product.price) * product.quantity,
    0
  );

  useEffect(() => {
    if (cart.length > 0) {
      setLocalCart(cart);
      clearCart();
    }
  }, [cart, clearCart]);

  useEffect(() => {
    if (cart.length === 0 && localCart.length === 0) {
      navigate("/");
    }
  }, [localCart, cart, navigate]);

  if (!localCart.length) {
    return <div></div>;
  }

  return (
    <ConfirmationContainer>
      <h1>Thank You for Your Purchase!</h1>
      <p>
        Your order has been placed successfully. Here's a summary of your
        purchase:
      </p>

      {localCart.map((product) => (
        <ProductSummary key={product.id}>
          <p>
            {product.title} - Quantity: {product.quantity} - Price:{" "}
            {product.discountedPrice?.toFixed(2) ?? product.price.toFixed(2)} kr
          </p>
        </ProductSummary>
      ))}

      <TotalPrice>
        <h2>Total Paid: {totalPrice.toFixed(2)} kr</h2>
      </TotalPrice>

      <SuccessMessage>We hope you enjoy your products!</SuccessMessage>
      <GoToFrontButton to="/">
        <button>Go back to store</button>
      </GoToFrontButton>
    </ConfirmationContainer>
  );
}

const GoToFrontButton = styled(Link)`
  text-decoration: none;

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

const ConfirmationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductSummary = styled.div`
  margin: 10px 0;
  font-size: 1.2rem;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  margin-top: 30px;
  font-size: 1.2rem;
  color: #28a745;
`;
