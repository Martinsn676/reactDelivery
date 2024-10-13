import React from "react";
import { Link } from "react-router-dom";

// Define the interface for the expected props
export interface ProductProps {
  id: string;
  title: string;
  price: number;
  discountedPrice?: number; // Optional
  description: string;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
}

// AddCards function for rendering a product card
export function AddCards({
  id,
  title,
  price,
  discountedPrice,
  description,
  image,
  rating,
  tags,
}: ProductProps) {
  const linkUrl = `/product/${id}`;
  return (
    <div className="product-card" style={styles.card}>
      {/* Image */}

      <img src={image.url} alt={image.alt || title} style={styles.image} />

      {/* Title */}
      <h2> {title}</h2>

      {/* Price */}
      <div style={styles.priceContainer}>
        {discountedPrice && discountedPrice < price ? (
          <>
            <span style={styles.originalPrice}>{price.toFixed(2)} kr</span>
            <span style={styles.discountedPrice}>
              {" "}
              {discountedPrice.toFixed(2)} kr
            </span>
          </>
        ) : (
          <span style={styles.price}>{price.toFixed(2)} kr</span>
        )}
      </div>

      {/* Rating */}
      <div style={styles.rating}>Rating: {rating} / 5</div>

      {/* Description */}
      {/* <p>{description}</p> */}

      {/* Tags */}
      <div style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <span key={index} style={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
      <Link to={linkUrl} style={styles.linkButton}>
        View product
      </Link>
    </div>
  );
}

// Styles object for inline styling
const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    paddingBottom: "65px",
    // margin: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    userSelect: "none" as "none", // This is how you ensure TypeScript compatibility
    position: "relative" as "relative",
  },

  linkButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginTop: "20px",
    position: "absolute" as "absolute",
    bottom: "10px",
    transform: "translateX(-50%)",
    left: "50%",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },
  image: {
    display: "block", // Ensure the image is treated as a block element
    maxWidth: "100%", // Max width so it doesn't stretch beyond the container
    height: "auto",
    maxHeight: "200px", // Ensure the height is constrained
    borderRadius: "8px",
    margin: "0 auto", // Horizontally centers the image
  },

  priceContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    margin: "8px 0",
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#888",
  },
  discountedPrice: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  tagsContainer: {
    marginTop: "8px",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    padding: "4px 8px",
    marginRight: "4px",
    fontSize: "12px",
    color: "#555",
  },
};
