import React, { useState, useEffect } from "react";
import ProductTable from "../../component/managetableproducts/ProductTable";
import styles from "./manageProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from "../../Config";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setAllProducts] = useState([]);

  // console.log(products);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/all-products`);
      setAllProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const validateUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {validateUser === null ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className={`${styles.Manage_Products_heading} col-lg-12`}>
                <h1>Product Management</h1>
              </div>
            </div>
          </div>
          <div className={`${styles.background_image}`}>
            <div className="container">
              <div className={styles.search_container}>
                <input
                  type="text"
                  className={styles.search_input}
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <button className={styles.search_button}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className={`${styles.table_scroll} row px-5`}>
              <ProductTable products={products} searchValue={searchValue} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManageProducts;
