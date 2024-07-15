import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../../apis/Api";
 
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const BASE_URL = "http://localhost:3001";
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await getCartItems();
        console.log("Cart Items Response:", res.data);
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
        // Optionally handle error, e.g., setCartItems([]) to clear cart on error
      }
    };
 
    fetchCartItems();
  }, []);
 
  const incrementQuantity = async (index) => {
    try {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += 1;
      setCartItems(newCartItems);
      await updateCartItemQuantity(
        newCartItems[index]._id,
        newCartItems[index].quantity
      );
    } catch (error) {
      console.error("Error updating cart item quantity", error);
      // Optionally, handle the error in UI or retry logic
    }
  };
 
  const decrementQuantity = async (index) => {
    try {
      let newCartItems = [...cartItems];
      if (newCartItems[index].quantity > 1) {
        newCartItems[index].quantity -= 1;
        await updateCartItemQuantity(
          newCartItems[index]._id,
          newCartItems[index].quantity
        );
      } else {
        await removeCartItem(newCartItems[index]._id);
        newCartItems = newCartItems.filter((_, i) => i !== index);
      }
      setCartItems(newCartItems);
    } catch (error) {
      console.error(
        "Error updating cart item quantity or removing cart item",
        error
      );
      // Optionally, handle the error in UI or retry logic
    }
  };
 
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        minHeight: "100vh",
        marginTop: "60px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
        Your Cart ({cartItems.length} items)
      </h1>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {cartItems.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div style={{ flex: "2", fontWeight: "bold" }}>Item</div>
              <div
                style={{ flex: "1", textAlign: "right", fontWeight: "bold" }}
              >
                Price
              </div>
              <div
                style={{ flex: "1", textAlign: "center", fontWeight: "bold" }}
              >
                Quantity
              </div>
              <div
                style={{ flex: "1", textAlign: "right", fontWeight: "bold" }}
              >
                Total
              </div>
            </div>
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{ flex: "2", display: "flex", alignItems: "center" }}
                >
                  <img
                    src={`${BASE_URL}/products/${item.productId.productImage}`}
                    alt={item.productId.productName}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <h2 style={{ margin: "0 0 5px 0" }}>
                      {item.productId.productName}
                    </h2>
                  </div>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  ${item.productId.productPrice.toFixed(2)}
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                  <button
                    onClick={() => decrementQuantity(index)}
                    style={{
                      marginRight: "5px",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => incrementQuantity(index)}
                    style={{
                      marginLeft: "5px",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  ${(item.productId.productPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                style={{
                  padding: "10px",
                  flex: "1",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Apply Coupon
              </button>
            </div>
            <div
              style={{
                padding: "10px 0",
                borderTop: "1px solid #ccc",
                textAlign: "right",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                Subtotal: $
                {cartItems
                  .reduce(
                    (total, item) =>
                      total + item.productId.productPrice * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
              <div>
                Sales Tax: $
                {(
                  cartItems.reduce(
                    (total, item) =>
                      total + item.productId.productPrice * item.quantity,
                    0
                  ) * 0.1
                ).toFixed(2)}
              </div>
              <div style={{ marginTop: "10px", fontSize: "1.2em" }}>
                Grand Total: $
                {(
                  cartItems.reduce(
                    (total, item) =>
                      total + item.productId.productPrice * item.quantity,
                    0
                  ) * 1.1
                ).toFixed(2)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => navigate("/homepage")}
                style={{
                  padding: "10px 20px",
                  fontSize: "1.2em",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add More Items
              </button>
              <button
                onClick={() => navigate("/payment")}
                style={{
                  padding: "10px 20px",
                  fontSize: "1.2em",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#fff" }}>
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
};
 
export default Cart;
 
