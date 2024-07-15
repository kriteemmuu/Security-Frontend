import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const WishList = () => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Function to handle item removal from wishlist by index
  const handleRemoveFromWishlistByIndex = (index) => {
    const updatedWishlist = [...wishlist]; // Create a copy of the wishlist
    updatedWishlist.splice(index, 1); // Remove item by index
    setWishlist(updatedWishlist); // Update state
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update localStorage
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <ListGroup variant="flush">
              {wishlist.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <img
                        src={`http://localhost:3001/products/${item.productImage}`}
                        alt={item.productName}
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={7}>
                      <p>{item.productName}</p>
                      <p>Price: Rs {item.productPrice}</p>
                    </Col>
                    <Col md={3} className="d-flex justify-content-end">
                      <Button variant="danger" onClick={() => handleRemoveFromWishlistByIndex(index)}>
                        <FaTrash />
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WishList;
