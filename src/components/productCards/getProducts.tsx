import React, { useState, useEffect } from "react";
import { AddCards, ProductProps } from "./addCards";
import styled from "styled-components";

// Define the interface for the expected props
interface ApiFilter {
  count: number;
  search: string;
}

// getAllCards function for fetching data from the API and rendering product cards
export function GetAllCards({ count, search }: ApiFilter) {
  const [products, setProducts] = useState<ProductProps[]>([]); // State to hold fetched products
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const [loadingText, setLoadingText] = useState("Loading."); // State for dynamic loading text

  // Fetch data when the component is mounted or when count/search changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop`);
        const json = await response.json();
        // Assuming API returns an array of products
        setProducts(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [count, search]); // Dependency array now only has count and search

  // Dynamic loading text logic
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

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []); // Empty dependency array to run only once

  if (loading) {
    return <LoadingText>{loadingText}</LoadingText>; // Show dynamic loading text while waiting
  }

  if (!products.length) {
    return <div>No products found</div>;
  }

  // Filter the products based on the search query (case-insensitive search)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle input change
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update the search query state as the user types
  };

  return (
    <>
      {/* Search Container */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInput} // Call handleSearchInput on change
        />
      </SearchContainer>

      {/* Render the filtered products */}
      <ProductListStyle className="product-list flex-row flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <AddCards
              key={product.id} // Unique key for each product
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
          <p>No products found</p> // Show a message if no products match the search
        )}
      </ProductListStyle>
    </>
  );
}

// Styled components

// Dynamic loading text styling
const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 100px;
`;

// Container for centering the search input
const SearchContainer = styled.div`
  display: flex;
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  margin: 20px 0; // Add margin above and below
`;

// Search input styling
const SearchInput = styled.input`
  width: 40%; // Adjust the width of the input field
  padding: 12px 20px; // Add padding for comfort
  font-size: 1rem; // Set font size
  border: 2px solid #ddd; // Border styling
  border-radius: 8px; // Rounded corners
  outline: none; // Remove the default outline
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Add subtle shadow

  &:focus {
    border-color: #007bff; // Change border color on focus
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); // Focus shadow effect
  }
`;

// Product list styling
const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Flexible columns */
  gap: 16px; /* The gap between items */
  padding: 10px;

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
