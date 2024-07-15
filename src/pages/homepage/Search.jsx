import  { useEffect, useState } from "react";
import {getAllProducts} from "../../apis/Api";
 
const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(() => {
    getAllProducts().then((res) => {
      console.log(res.data.products);
      setProducts(res.data.products);
      setSearchResults(res.data.products); // Initialize search results with all products
    });
  }, []);
 
  const handleSearchChange = (e) => {
    const query = e.target.value;
 
    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
 
    setSearchResults(filteredProducts);
  };
 
  const styles = {
    container: {
      marginTop: "80px", // Adjust this value as needed
    },
    input: {
      width: "75%",
    },
  };
 
  return (
    <div className="container" style={styles.container}>
      <div className="d-flex justify-content-between">
        <h1>Searching Products!</h1>
        <div className="d-flex flex-row">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchChange}
            style={styles.input}
          />
        </div>
      </div>
 
      {searchResults.length > 0 ? (
        searchResults.map((product) => (
          <div key={product.id} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.productPrice}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};
 
export default Search;
 
