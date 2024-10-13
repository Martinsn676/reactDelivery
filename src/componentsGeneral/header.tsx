import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.png";
import { ProductProps } from "../components/product";

interface HeaderProps {
  cart: ProductProps[];
}

export function Header({ cart }: HeaderProps) {
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={logo} alt="logo alt" />
      </Link>
      <Nav cart={cart} />
    </HeaderContainer>
  );
}

function Nav({ cart }: { cart: ProductProps[] }) {
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.quantity;
  });
  return (
    <NavContainer>
      <ul>
        <li className="onlyPC">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="bi bi-cart-fill"></i> ({cartCount}){" "}
          </Link>
        </li>
        <li className="onlyPC">
          <Link to="/contact">Contact us!</Link>
        </li>
      </ul>
    </NavContainer>
  );
}

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
    font-size: 20px;
    display: inline-block;
    transition: transform 0.3s ease;
    height: 30px;
    width: auto;
    line-height: 30px;
    color: black;

    &:hover {
      transform: scale(1.15);
    }
  }

  @media (max-width: 768px) {
    ul li.onlyPC {
      display: none;
    }
    a {
      display: block;
      text-align: center;
      padding: 15px;
    }
  }
`;
