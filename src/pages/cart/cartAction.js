// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { deleteProduct, getAllProducts } from "../../apis/Api.js";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/add/product");
//   };

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getAllProducts()
//       .then((res) => {
//         setProducts(res.data.products);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleDeleteProduct = (id) => {
//     const confirmDialog = window.confirm("Are you sure you want to delete?");
//     if (confirmDialog) {
//       deleteProduct(id)
//         .then((res) => {
//           if (res.status === 201) {
//             toast.success(res.data.message);
//             setProducts(products.filter((product) => product._id !== id));
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           if (error.response.status === 500) {
//             toast.error(error.response.data.message);
//           }
//         });
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <button onClick={handleClick} style={styles.button}>
//           New Product
//         </button>
//       </div>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Image</th>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Price</th>
//             <th style={styles.th}>Category</th>
//             <th style={styles.th}>Description</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products && products.length > 0 ? (
//             products.map((singleProduct) => (
//               <tr key={singleProduct._id}>
//                 <td style={styles.td}>
//                   <img
//                     width="40px"
//                     height="40px"
//                     src={`http://localhost:3001/products/${singleProduct.productImage}`}
//                     alt="productImage"
//                     style={styles.img}
//                   />
//                 </td>
//                 <td style={styles.td}>{singleProduct.productName}</td>
//                 <td style={styles.td}>{singleProduct.productPrice}</td>
//                 <td style={styles.td}>{singleProduct.productCategory}</td>
//                 <td style={styles.td}>{singleProduct.productDescription}</td>
//                 <td style={styles.td}>
//                   <Link
//                     to={`/admin/update/product/${singleProduct._id}`}
//                     style={{ ...styles.button, ...styles.editButton }}
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDeleteProduct(singleProduct._id)}
//                     style={{ ...styles.button, ...styles.deleteButton }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={styles.td}>
//                 <span style={{ textAlign: "center" }}>No Data Found</span>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "'Arial', sans-serif",
//     backgroundColor: "#f4f4f9",
//     borderRadius: "8px",
//   },
//   header: {
//     textAlign: "right",
//     marginBottom: "20px",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     borderRadius: "8px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     margin: "5px",
//   },
//   editButton: {
//     backgroundColor: "#007BFF",
//   },
//   deleteButton: {
//     backgroundColor: "#DC3545",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     backgroundColor: "white",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//   },
//   th: {
//     padding: "12px",
//     borderBottom: "1px solid #ddd",
//     backgroundColor: "#f4f4f4",
//     textAlign: "left",
//   },
//   td: {
//     padding: "12px",
//     borderBottom: "1px solid #ddd",
//   },
//   img: {
//     borderRadius: "4px",
//   },
// };

// export default AdminDashboard;

