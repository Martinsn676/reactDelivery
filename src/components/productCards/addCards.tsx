import React from "react";
import { Link } from "react-router-dom";

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
}

export function AddCards({
  id,
  title,
  price,
  discountedPrice,
  image,
  rating,
  tags,
}: ProductProps) {
  const linkUrl = `/product/${id}`;
  return (
    <div className="product-card" style={styles.card}>
      <img src={image.url} alt={image.alt || title} style={styles.image} />

      <h2> {title}</h2>

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

      <div style={styles.rating}>Rating: {rating} / 5</div>

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

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    paddingBottom: "65px",

    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    userSelect: "none" as "none",
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
    display: "block",
    maxWidth: "100%",
    height: "auto",
    maxHeight: "200px",
    borderRadius: "8px",
    margin: "0 auto",
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
