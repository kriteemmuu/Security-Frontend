// // import { useEffect, useState } from "react";
// // import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
// // import { Link } from "react-router-dom";
// // import { getAllHomeProducts } from "../../apis/Api.js";
// // import "./Home.css";

// // const Home = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await getAllHomeProducts();
// //         setProducts(response.data.data);
// //       } catch (error) {
// //         console.log(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <Container>
// //       <Row className="mt-4">
// //         <Col>
// //           <h2>Welcome to Diva Maternity</h2>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col>
// //           <h6>
// //             Diva Maternity is your go-to online platform for category-based
// //             products catering to women&apos;s and baby products.
// //           </h6>
// //         </Col>
// //         <Col>
// //           <h6>
// //             Explore our wide range of products designed to make your maternity
// //             journey easier and more enjoyable.
// //           </h6>
// //         </Col>
// //       </Row>

// //       <Row className="mt-4">
// //         <Col>
// //           <h3>Our Products</h3>
// //         </Col>
// //       </Row>

// //       <Row className="mt-3">
// //         {loading ? (
// //           <Col className="text-center">
// //             <Spinner animation="border" role="status">
// //               <span className="visually-hidden">Loading...</span>
// //             </Spinner>
// //           </Col>
// //         ) : products.length > 0 ? (
// //           products.map((product, index) => (
// //             <Col md={4} className="mb-4" key={index}>
// //               <Card className="card-custom">
// //                 <Card.Img
// //                   variant="top"
// //                   src={`http://localhost:3001/products/${product.productImage}`}
// //                   alt={product.productName}
// //                   className="card-img-custom"
// //                 />
// //                 <Card.Body>
// //                   <Card.Title>{product.productName}</Card.Title>
// //                   <Card.Text>Price: Rs {product.productPrice}</Card.Text>
// //                   <Link to={`/product-details/${product._id}`}>
// //                     <Button variant="primary">View Product</Button>
// //                   </Link>
// //                 </Card.Body>
// //               </Card>
// //             </Col>
// //           ))
// //         ) : (
// //           <Col>
// //             <h1>No Data Found</h1>
// //           </Col>
// //         )}
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default Home;



// import { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { getAllHomeProducts } from "../../apis/Api.js";
// import "./Home.css";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllHomeProducts();
//         setProducts(response.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to handle adding to wishlist
//   const handleAddToWishlist = (productId) => {
//     // Implement logic to add product to wishlist
//     console.log("Added to Wishlist", productId);
//     // For instance, save to local storage or update database
//   };

//   return (
//     <Container>
//       <Row className="mt-4">
//         <Col>
//           <h2>Welcome to Diva Maternity</h2>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <h6>
//             Diva Maternity is your go-to online platform for category-based
//             products catering to women&apos;s and baby products.
//           </h6>
//         </Col>
//         <Col>
//           {/* <h6>
//             Explore our wide range of products designed to make your maternity
//             journey easier and more enjoyable.
//           </h6> */}
//         </Col>
//       </Row>

//       <Row className="mt-4">
//         <Col>
//           <h3>Our Products</h3>
//         </Col>
//       </Row>

//       <Row className="mt-3">
//         {loading ? (
//           <Col className="text-center">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </Col>
//         ) : products.length > 0 ? (
//           products.map((product, index) => (
//             <Col md={4} className="mb-4" key={index}>
//               <Card className="card-custom">
//                 <Card.Img
//                   variant="top"
//                   src={`http://localhost:3001/products/${product.productImage}`}
//                   alt={product.productName}
//                   className="card-img-custom"
//                 />
//                 <Card.Body>
//                   <Card.Title>{product.productName}</Card.Title>
//                   <Card.Text>Price: Rs {product.productPrice}</Card.Text>
//                   <div className="d-flex justify-content-between">
//                     <Link to={`/product-details/${product._id}`}>
//                       <Button variant="primary">View Product</Button>
//                     </Link>
//                     <Button variant="success" onClick={() => handleAddToWishlist(product._id)}>
//                       Add to WishList
//                     </Button>
                    
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <Col>
//             <h1>No Data Found</h1>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllHomeProducts } from "../../apis/Api.js";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllHomeProducts();
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToWishlist = (productId) => {
    const productToAdd = products.find(product => product._id === productId);
    if (!productToAdd) {
      toast.error("Product not found!");
      return;
    }

    let currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (currentWishlist.some(item => item._id === productId)) {
      toast.info("Item already in Wishlist");
      return;
    }

    currentWishlist.push(productToAdd);
    localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
    toast.success("Added to Wishlist!");
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Welcome to Diva Maternity</h2>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Our Products</h3>
        </Col>
      </Row>

      <Row className="mt-3">
        {loading ? (
          <Spinner animation="border" role="status" className="m-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="card-custom">
                <Card.Img
                  variant="top"
                  src={`http://localhost:3001/products/${product.productImage}`}
                  alt={product.productName}
                  className="card-img-custom"
                />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>Price: Rs {product.productPrice}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/product-details/${product._id}`}>
                      <Button variant="primary">View Product</Button>
                    </Link>
                    <Button variant="success" onClick={() => handleAddToWishlist(product._id)}>
                      Add to Wishlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center"><h1>No Data Found</h1></Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;


