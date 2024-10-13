import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.png";
import { ProductProps } from "../components/product"; // Adjust the path as necessary

// Define the props for the Header component
interface HeaderProps {
  cart: ProductProps[]; // Expecting an array of ProductProps as cart items
}

// Header Component with Styled Components
export function Header({ cart }: HeaderProps) {
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={logo} alt="logo alt" />
      </Link>
      <Nav cart={cart} /> {/* Pass cart down to Nav */}
    </HeaderContainer>
  );
}

// Navigation Component that displays the cart count
function Nav({ cart }: { cart: ProductProps[] }) {
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.quantity;
  });
  return (
    <NavContainer>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="bi bi-cart-fill"></i> ({cartCount}){" "}
            {/* Display the number of items in the cart */}
          </Link>
        </li>
        <li>
          <Link to="/contact">Contact us!</Link>
        </li>
      </ul>
    </NavContainer>
  );
}

// Styled components for the Header and Navigation
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const NavContainer = styled.nav`
  ul {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1.2rem;
  }
  a {
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 20px; /* Base font size */
    display: inline-block;
    transition: transform 0.3s ease; /* Smooth transition for scaling */
    height: 30px; /* Set height large enough to accommodate the scaled size */
    width: auto; /* Adjust as needed if the width is dynamic */
    line-height: 30px; /* Align text vertically within the height */
    color: black;
    /* Make sure it maintains the same space for the largest size */
    &:hover {
      transform: scale(1.15); /* Scale the element to increase size */
    }
  }

  // Responsive styling for mobile screens
  @media (max-width: 768px) {
    ul {
      flex-direction: column;
      gap: 10px;
    }

    a {
      display: block;
      text-align: center;
      padding: 15px;
    }
  }
`;
