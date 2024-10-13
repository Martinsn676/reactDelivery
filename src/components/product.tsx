import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styled from "styled-components";

// Interface for product properties
export interface ProductProps {
  id: string;
  title: string;
  price: number;
  discountedPrice?: number;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
  quantity: number;
}

// Context interface to get cart functions
interface CartContext {
  addToCart: (product: ProductProps) => void;
}

// Single product component that fetches product details
export function Product() {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL parameters
  const { addToCart } = useOutletContext<CartContext>(); // Get addToCart from context
  const [product, setProduct] = useState<ProductProps | null>(null); // State to hold the product data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [loadingText, setLoadingText] = useState("Loading."); // Dynamic loading text
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch product data when the component mounts or when the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setProduct(data.data); // Set the product data
        } else {
          throw new Error(data.message || "Error fetching product details");
        }
      } catch (error: any) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Stop loading when data is fetched or failed
      }
    };

    fetchProduct();
  }, [id]);

  // Dynamic loading effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prev) =>
        prev === "Loading."
          ? "Loading.."
          : prev === "Loading.."
          ? "Loading..."
          : "Loading."
      );
    }, 500); // Change every 500ms

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  // If still loading, display dynamic loading message
  if (loading) {
    return <LoadingText>{loadingText}</LoadingText>;
  }

  // If an error occurred, display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no product is found, display a message
  if (!product) {
    return <div>Product not found</div>;
  }

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add the product to the cart
    }
  };

  // Display the product details in a structured layout
  return (
    <ProductPageContainer>
      <ProductImageContainer>
        <img src={product.image.url} alt={product.image.alt || product.title} />
      </ProductImageContainer>

      <ProductDetails>
        <h1>{product.title}</h1>
        <p className="description">{product.description}</p>

        <PriceContainer>
          {product.discountedPrice ? (
            <>
              <span className="original-price">
                {product.price.toFixed(2)} kr
              </span>
              <span className="discounted-price">
                {product.discountedPrice.toFixed(2)} kr
              </span>
            </>
          ) : (
            <span className="price">{product.price.toFixed(2)} kr</span>
          )}
        </PriceContainer>

        <RatingAndTags>
          <div className="rating">Rating: {product.rating} / 5</div>
          <div className="tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </RatingAndTags>

        {/* Add to Cart button */}
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      </ProductDetails>
    </ProductPageContainer>
  );
}

// Styled components for the product page layout
const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 100px;
`;

const ProductPageContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #666;
  }
`;

const PriceContainer = styled.div`
  margin-bottom: 20px;

  .original-price {
    text-decoration: line-through;
    margin-right: 10px;
    color: #999;
    font-size: 1.5rem;
  }

  .discounted-price {
    color: red;
    font-weight: bold;
    font-size: 1.8rem;
  }

  .price {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
  }
`;

const RatingAndTags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .rating {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .tags {
    display: flex;
    gap: 10px;

    .tag {
      background-color: #eee;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.9rem;
    }
  }
`;

// Styled component for Add to Cart button
const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }
  &:active {
    background-color: #0e551e;
  }
`;
