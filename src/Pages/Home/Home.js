import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Card } from "react-bootstrap";
import secImage from "./image95.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";
import AddCategoryModal from "../../component/addCategoryModal/AddCategoryModal";

const Home = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? allproducts.filter((product) => product.categoryName === selectedCategory)
    : allproducts;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/all-products`);
      setAllProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories/all-categories`);
      // console.log(res.data, "categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: null,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(allproducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const soldProducts = allproducts.filter(
    (product) => product.productstatus === "SOLD"
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const navigate = useNavigate();

  const UploadProductpage = () => {
    navigate("/upload-product");
  };

  const ManageProducts = () => {
    navigate("/manage-products");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/admin_atlanticpower')
  };

  const validateUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container-fluid">
      {validateUser === null ? (
        ""
      ) : (
        <div className="row">
          <div className="col-lg-6"></div>
          <div className={`${styles.bodybutton} col-lg-6`}>
            <button onClick={ManageProducts} className={styles.uploadbutton}>
              MANAGE PRODUCT
            </button>
            <button onClick={UploadProductpage} className={styles.uploadbutton}>
              UPLOAD A PRODUCT
            </button>
            <button onClick={openModal} className={styles.uploadbutton}>
              ADD CATEGORY
            </button>
            <button onClick={logout} className={styles.uploadbutton}>
              LOGOUT
            </button>
          </div>
        </div>
      )}

     {/* category listing section  */}
     <div className="container">
        <div className="row pt-5 py-3">
          <div className="text-lg-start text-center">
            <h2>Categories</h2>
          </div>
        </div>
        <div className="container">
          <div className={`${styles.products} row`}>
           
            <Slider {...sliderSettings}>
            <div className="col-lg-12 text-lg-start text-center">
              <button
                className={`${styles.categorybutton} ${
                  selectedCategory === null ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick(null)} // Added "All" button with null value
              >
                All
              </button>
            </div>
              {categories.map((category, index) => (
                <div className="col-lg-12 text-lg-start text-center">
                  <button
                    className={`${styles.categorybutton} ${
                      selectedCategory === category.categoryName
                        ? styles.active
                        : ""
                    }`}
                    key={category._id}
                    onClick={() => handleCategoryClick(category.categoryName)}
                  >
                    {category.categoryName}
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* product cards section */}

      <div className="container">
        <div className="row pt-5 pb-4">
          <div className="text-lg-start text-center">
          <h2>Product Listing</h2>
          </div>
        </div>
        <div className={`${styles.products} row`}>
          {paginatedProducts
            .filter((item) => item.productstatus === "UNSOLD")
            .map((product, index) => (
              <div
                className={`col-lg-3 col-md-6 d-flex justify-content-center col-sm-12 `}
              >
                <Card
                  role="button"
                  onClick={() => navigate(`/single-product/${product._id}`)}
                  className={`my-3 ${styles.prodCards}`}
                >
                  <Card.Img variant="top" src={product.featureImage} />
                  <Card.Body className={styles.cardBody}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <p className={styles.cardcategoryheading}>
                        {product.categoryName}
                      </p>
                      <div className={styles.cardpricing}>
                        <p className={styles.cuttext}>${product.cutoffprice}</p>
                        <p className={styles.orignalpricetext}>
                          ${product.price}
                        </p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>

      {/* product pagination section  */}
      <div className={`${styles.paginationrow} row`}>
        <div className={`${styles.nextprevbtn} col-lg-6 `}>
          {currentPage > 1 && (
            <button
              className={styles.paginationbutton}
              onClick={handlePrevPage}
            >
              Previous
            </button>
          )}
        </div>

        <div className={`${styles.nextprevbtn} col-lg-6 `}>
          {currentPage < totalPages && (
            <button
              className={styles.paginationbutton}
              onClick={handleNextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* imagecontainer section */}
      <div className={styles.imagesectionbg}>
        <div className="container">
          <div className={`row ${styles.sectionCTA}`}>
            <div
              className={`col-lg-6 order-lg-1 text-lg-start text-center order-2 ${styles.colGap}`}
            >
              <h1 className="text-white">
                Equipments For Your <br /> Construction Work
              </h1>
              <p className="text-white">We Would Love To Hear From You</p>
            </div>
            <div className="col-lg-6 order-lg-2 order-1 text-lg-start text-center">
              <img src={secImage} alt="alpha" className={styles.ctaImg} />
            </div>
          </div>
        </div>
      </div>

      {/* Featured products */}
      <div className="container">
        <div className={`${styles.products} row`}>
          <h2 className="py-3">Sold products</h2>
          <div className="container">
            <div className={`${styles.products} row`}>
              <Slider {...sliderSettings} slidesToScroll={1}>
                {soldProducts.map((product, index) => (
                  <div className="col-lg-3 d-flex justify-md-content-start justify-content-center">
                    <Card
                      role="button"
                      key={product._id}
                      onClick={() => navigate(`/single-product/${product._id}`)}
                      className={`my-3`}
                      style={{ width: "18rem" }}
                    >
                      <Card.Img variant="top" src={product.featureImage} />
                      <Card.Body className={styles.cardBody}>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <p className={styles.cardcategoryheading}>
                            {product.categoryName}
                          </p>
                          <div className={styles.cardpricing}>
                            <p className={styles.cuttext}>
                              ${product.cutoffprice}
                            </p>
                            <p className={`ps-3 ${styles.orignalpricetext}`}>
                              ${product.price}
                            </p>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div>{isOpen && <AddCategoryModal setIsOpen={setIsOpen} closeModal={closeModal} />}</div>
    </div>
  );
};

export default Home;
