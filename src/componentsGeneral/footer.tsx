import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanyInfo>
          <h2>Webstore</h2>
          <p>Your one-stop shop for all your needs!</p>
          <p>
            &copy; {new Date().getFullYear()} Webstore. All rights reserved.
          </p>
        </CompanyInfo>
        <FooterNav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </FooterNav>
        <SocialMedia>
          <p>Follow us:</p>
          <ul>
            <li>
              <Link to="/">Facebook</Link>
            </li>
            <li>
              <Link to="/">Instagram</Link>
            </li>
            <li>
              <Link to="/">Twitter</Link>
            </li>
          </ul>
        </SocialMedia>
      </FooterContent>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    margin: 5px 0;
  }
`;

const FooterNav = styled.nav`
  flex: 1;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s;

        &:hover {
          color: #ccc;
        }
      }
    }
  }
`;

const SocialMedia = styled.div`
  flex: 1;

  p {
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 15px;

    li {
      a {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s;

        &:hover {
          color: #ccc;
        }
      }
    }
  }
`;

export default Footer;
