import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Header } from "./componentsGeneral/header";
import { Footer } from "./componentsGeneral/footer";
import ContactForm from "./components/contact";
import { GetAllCards } from "./components/productCards/getProducts";
import { Product } from "./components/product";
import { Cart } from "./components/cart";
import { CheckoutConfirmation } from "./components/CheckoutConfirmation";
import CartProvider, { useCart } from "./components/CartContext";

function Layout() {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  return (
    <div>
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
      </div>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <CartProvider>
      <Router>
        {" "}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GetAllCards count={4} search="" />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<ContactForm />} />
            <Route
              path="/CheckoutConfirmation"
              element={<CheckoutConfirmation />}
            />
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
