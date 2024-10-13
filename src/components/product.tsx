import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styled from "styled-components";

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

interface CartContext {
  addToCart: (product: ProductProps) => void;
}

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useOutletContext<CartContext>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState("Loading.");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setProduct(data.data);
        } else {
          throw new Error(data.message || "Error fetching product details");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

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

        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      </ProductDetails>
    </ProductPageContainer>
  );
}

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
