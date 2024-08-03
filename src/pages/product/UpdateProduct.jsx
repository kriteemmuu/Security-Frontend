import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProductApi, updateProduct } from "../../apis/Api.js";
import { FaArrowLeft } from "react-icons/fa";
const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { _id: 1, categoryName: "Electronics" },
    { _id: 2, categoryName: "Clothing" },
    { _id: 3, categoryName: "Toys" },
    { _id: 4, categoryName: "Vitamins" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProductApi(id);
        setProductName(res.data.product.productName);
        setProductPrice(res.data.product.productPrice);
        setProductCategory(res.data.product.productCategory);
        setProductDescription(res.data.product.productDescription);
        setPreviewImage(
          `http://localhost:3001/products/${res.data.product.productImage}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);

    if (productImage) {
      formData.append("productImage", productImage);
    }

    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    setLoading(true);

    try {
      const res = await updateProduct(id, formData, config);
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/admin_dashboard");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex align-items-center">
        <Link
          to="/admin_dashboard/all-productsList"
          className="text-decoration-none me-3"
        >
          <FaArrowLeft />
        </Link>
        <h2 className="mb-0">Update Product</h2>
      </div>
      <div className="d-flex gap-3" style={{ marginTop: "4rem" }}>
        <form>
          <label>Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Enter your product name"
            disabled={loading}
          />

          <label className="mt-2">Product Price</label>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="form-control"
            type="number"
            placeholder="Enter your product price"
            disabled={loading}
          />

          <label className="mt-2">Choose category</label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="form-control"
            disabled={loading}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <label className="mt-2">Enter description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="form-control"
            disabled={loading}
          ></textarea>

          <label className="mt-2">Choose product Image</label>
          <input
            onChange={handleImage}
            type="file"
            className="form-control"
            disabled={loading}
          />

          <button
            onClick={handleUpdate}
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>

        <div className="image-section">
          <h6>Previewing old images</h6>
          <img
            height={"200px"}
            width={"300px"}
            className="img-fluid rounded-4 object-fit-cover"
            alt="myImg"
          />
          {previewImage && (
            <>
              <h6>New Image</h6>
              <img
                height={"200px"}
                width={"300px"}
                className="img-fluid rounded-4 object-fit-cover"
                src={previewImage}
                alt="previewImage"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
