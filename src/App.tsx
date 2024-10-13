import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Header } from "./componentsGeneral/header";
import { Footer } from "./componentsGeneral/footer";
import ContactForm from "./components/contact";
import { GetAllCards } from "./components/productCards/getProducts";
import { ProductProps, Product } from "./components/product";
import { useLocation } from "react-router-dom";
import { Cart } from "./components/cart";
import { CheckoutConfirmation } from "./components/CheckoutConfirmation";

function RouteNotFound() {
  return <div>Page not found</div>;
}

// Define the props for Layout component
interface LayoutProps {
  cart: ProductProps[];
  addToCart: (product: ProductProps) => void;
  removeFromCart: (productId: string) => void; // Make sure this is present
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: (productId: string) => void;
}

// Use LayoutProps to define the types for Layout component
function Layout({
  cart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}: LayoutProps) {
  return (
    <div>
      <ScrollToTop />
      <Header cart={cart} />
      <div className="main">
        <Outlet
          context={{
            cart,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
          }}
        />
        {/* Ensure clearCart is passed into the context */}
      </div>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Run this effect when the pathname changes
  return null;
}

function App() {
  const [cart, setCart] = useState<ProductProps[]>([]);

  // Function to add or increase product quantity
  const addToCart = (product: ProductProps) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Increase quantity if product exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to increase product quantity
  const increaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); // Reset the cart to an empty array
  };

  // Function to decrease product quantity (remove product if quantity reaches 0)
  const decreaseQuantity = (productId: string) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  // Function to completely remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              cart={cart}
              addToCart={addToCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart} // Pass clearCart to Layout
            />
          }
        >
          <Route index element={<GetAllCards count={4} search="" />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} /> {/* Cart Page */}
          <Route path="contact" element={<ContactForm />} />
          <Route
            path="/CheckoutConfirmation"
            element={<CheckoutConfirmation />}
          />{" "}
          {/* Checkout Confirmation */}
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
