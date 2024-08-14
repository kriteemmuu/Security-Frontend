// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createProductApi } from "../../apis/Api.js";
// import { FaArrowLeft } from "react-icons/fa";

// const AddProduct = () => {
//   const navigate = useNavigate();

//   const [productName, setProductName] = useState("");
//   const [inStock, setInStock] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productImage, setProductImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImage = (event) => {
//     const file = event.target.files[0];
//     setProductImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const validateForm = () => {
//     if (
//       !productName ||
//       !productPrice ||
//       !productCategory ||
//       !productDescription ||
//       !productImage
//     ) {
//       toast.error("Please fill all fields and select an image");
//       return false;
//     }
//     return true;
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("inStock", inStock);
//     formData.append("productPrice", productPrice);
//     formData.append("productCategory", productCategory);
//     formData.append("productDescription", productDescription);
//     formData.append("productImage", productImage);

//     setLoading(true);

//     try {
//       const res = await createProductApi(formData);
//       setLoading(false);

//       if (res.status === 201) {
//         toast.success(res.data.message);
//         navigate("/admin_dashboard/all-productsList");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       if (error.response && error.response.status === 500) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Failed to add product");
//       }
//     }
//   };

//   const containerStyle = { fontFamily: "'Roboto', sans-serif" };
//   const headingStyle = {
//     fontWeight: 700,
//     marginBottom: "20px",
//     textAlign: "center",
//   };
//   const labelStyle = {
//     fontWeight: 700,
//     fontSize: "1.1rem",
//     color: "#333",
//     display: "block",
//     marginBottom: "10px",
//   };
//   const formControlStyle = { fontSize: "1rem", marginBottom: "20px" };
//   const buttonStyle = { fontWeight: 700 };
//   const textCenterStyle = { textAlign: "center" };
//   const imgStyle = { height: "300px", objectFit: "cover", width: "100%" };

//   return (
//     <div className="container mt-5" style={containerStyle}>
//       <div className="d-flex align-items-center">
//         <Link
//           to="/admin_dashboard/all-productsList"
//           className="text-decoration-none me-3"
//         >
//           <FaArrowLeft />
//         </Link>
//         <h2 className="mb-0">Add Product</h2>
//       </div>
//       <div className="row" style={{ marginTop: "10px" }}>
//         <div className="col-md-6">
//           <form onSubmit={handleAdd}>
//             <div className="mb-3">
//               <label htmlFor="productName" style={labelStyle}>
//                 Product Name
//               </label>
//               <input
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 className="form-control"
//                 type="text"
//                 id="productName"
//                 placeholder="Enter your product name"
//                 style={formControlStyle}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="productPrice" style={labelStyle}>
//                 Product Price
//               </label>
//               <input
//                 value={productPrice}
//                 onChange={(e) => setProductPrice(e.target.value)}
//                 className="form-control"
//                 type="number"
//                 id="productPrice"
//                 placeholder="Enter your product price"
//                 style={formControlStyle}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="productCategory" style={labelStyle}>
//                 Choose Category
//               </label>
//               <select
//                 value={productCategory}
//                 onChange={(e) => setProductCategory(e.target.value)}
//                 className="form-select"
//                 id="productCategory"
//                 style={formControlStyle}
//               >
//                 <option value="">Select your category</option>
//                 <option value="Essential">Essentials</option>
//                 <option value="toys ">Toy</option>
//                 <option value="cloth">Clothing</option>
//                 <option value="Others">Other Products</option>
//               </select>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="productName" style={labelStyle}>
//                 Product Stock
//               </label>
//               <input
//                 value={inStock}
//                 onChange={(e) => setInStock(e.target.value)}
//                 className="form-control"
//                 type="number"
//                 id="inStock"
//                 placeholder="Enter your product name"
//                 style={formControlStyle}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="productDescription" style={labelStyle}>
//                 Enter Description
//               </label>
//               <textarea
//                 value={productDescription}
//                 onChange={(e) => setProductDescription(e.target.value)}
//                 className="form-control"
//                 id="productDescription"
//                 rows="4"
//                 style={formControlStyle}
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="productImage" style={labelStyle}>
//                 Choose Product Image
//               </label>
//               <input
//                 onChange={handleImage}
//                 type="file"
//                 className="form-control"
//                 id="productImage"
//                 style={formControlStyle}
//               />
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               style={buttonStyle}
//               disabled={loading}
//             >
//               {loading ? "Adding..." : "Add Product"}
//             </button>
//           </form>
//         </div>
//         <div className="col-md-6" style={textCenterStyle}>
//           {previewImage && (
//             <>
//               <h5
//                 style={{
//                   ...labelStyle,
//                   marginTop: "20px",
//                   marginBottom: "15px",
//                 }}
//               >
//                 Product Image Preview
//               </h5>
//               <img
//                 src={previewImage}
//                 alt="Product"
//                 className="img-fluid rounded"
//                 style={imgStyle}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductApi } from "../../apis/Api.js";
import { FaArrowLeft } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [inStock, setInStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !productImage
    ) {
      toast.error("Please fill all fields and select an image");
      return false;
    }
    return true;
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("inStock", inStock);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    setLoading(true);

    try {
      const res = await createProductApi(formData);
      setLoading(false);

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/admin_dashboard/all-productsList");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add product");
      }
    }
  };

  const containerStyle = { fontFamily: "'Roboto', sans-serif" };
  const labelStyle = {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#333",
    display: "block",
    marginBottom: "10px",
  };
  const formControlStyle = { fontSize: "1rem", marginBottom: "20px" };
  const buttonStyle = { fontWeight: 700 };
  const textCenterStyle = { textAlign: "center" };
  const imgStyle = { height: "300px", objectFit: "cover", width: "100%" };

  return (
    <div className="container mt-5" style={containerStyle}>
      <div className="d-flex align-items-center">
        <Link
          to="/admin_dashboard/all-productsList"
          className="text-decoration-none me-3"
        >
          <FaArrowLeft />
        </Link>
        <h2 className="mb-0">Add Product</h2>
      </div>
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-md-6">
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="productName" style={labelStyle}>
                Product Name
              </label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control"
                type="text"
                id="productName"
                placeholder="Enter your product name"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" style={labelStyle}>
                Product Price
              </label>
              <input
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control"
                type="number"
                id="productPrice"
                placeholder="Enter your product price"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productCategory" style={labelStyle}>
                Choose Category
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-select"
                id="productCategory"
                style={formControlStyle}
              >
                <option value="">Select your category</option>
                <option value="Essential">Essentials</option>
                <option value="toys">Toy</option>
                <option value="cloth">Clothing</option>
                <option value="Others">Other Products</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inStock" style={labelStyle}>
                Product Stock
              </label>
              <input
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                className="form-control"
                type="number"
                id="inStock"
                placeholder="Enter product stock"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" style={labelStyle}>
                Enter Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-control"
                id="productDescription"
                rows="4"
                style={formControlStyle}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="productImage" style={labelStyle}>
                Choose Product Image
              </label>
              <input
                onChange={handleImage}
                type="file"
                className="form-control"
                id="productImage"
                style={formControlStyle}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={buttonStyle}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
        <div className="col-md-6" style={textCenterStyle}>
          {previewImage && (
            <>
              <h5
                style={{
                  ...labelStyle,
                  marginTop: "20px",
                  marginBottom: "15px",
                }}
              >
                Product Image Preview
              </h5>
              <img
                src={previewImage}
                alt="Product"
                className="img-fluid rounded"
                style={imgStyle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

