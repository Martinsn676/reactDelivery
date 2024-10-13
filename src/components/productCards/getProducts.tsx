import React, { useState, useEffect } from "react";
import { AddCards, ProductProps } from "./addCards";
import styled from "styled-components";

interface ApiFilter {
  count: number;
  search: string;
}

export function GetAllCards({ count, search }: ApiFilter) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingText, setLoadingText] = useState("Loading.");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop`);
        const json = await response.json();

        setProducts(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [count, search]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prev) =>
        prev === "Loading."
          ? "Loading.."
          : prev === "Loading.."
          ? "Loading..."
          : "Loading."
      );
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <LoadingText>{loadingText}</LoadingText>;
  }

  if (!products.length) {
    return <div>No products found</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </SearchContainer>

      <ProductListStyle className="product-list flex-row flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <AddCards
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              discountedPrice={product.discountedPrice}
              description={product.description}
              image={product.image}
              rating={product.rating}
              tags={product.tags}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </ProductListStyle>
    </>
  );
}

const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 100px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  width: 40%;
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
  }
`;

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px 40px;
  @media (max-width: 400px) {
    padding: 20px 10px;
  }

  /* .product-card {
    width: calc(20% - 47px); // Fixed width for each product card (5 per row)

    @media (max-width: 1200px) {
      width: calc(25% - 47px); // 4 cards per row on smaller screens
    }

    @media (max-width: 900px) {
      width: calc(33.33% - 45px); // 3 cards per row on medium screens
    }

    @media (max-width: 600px) {
      width: calc(50% - 42px); // 2 cards per row on small screens
    }

    @media (max-width: 400px) {
      width: 100%; // 1 card per row on very small screens
    }
  }*/
`;
