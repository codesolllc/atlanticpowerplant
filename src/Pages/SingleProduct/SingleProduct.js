import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./singleproduct.module.css";
import Rating from "react-rating";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStarSolid } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BASE_URL from "../../Config";
import { useNavigate } from "react-router-dom";
import ContactModal from "../../component/contactModal/ContactModal";
import { Swiper, SwiperSlide } from "swiper/react";
import TabComponent1 from "../../component/TabComponets/TabComponent1";
import TabComponent2 from "../../component/TabComponets/TabComponent2";
import TabComponent3 from "../../component/TabComponets/TabComponent3";
import MarkSoldModal from "../../component/markSoldModal/MarkSoldModal";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import SocialShareModal from "../../component/socialShare/SocialShareModal";
import Badge from "react-bootstrap/Badge";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allproducts, setAllProducts] = useState([]);
  const [singleproduct, setSingleProduct] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [markSoldModal, setMarkSoldModal] = useState(false);

  const [shareModal, setshareModal] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = React.useState(1);
  Math.ceil(allproducts.length / productsPerPage);
  const paginatedProducts = allproducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const images = singleproduct.imageUrls;

  // const dummyImages = [
  //   "https://dummyimage.com/300x400/000000/ffffff",
  //   "https://dummyimage.com/300x400/ffffff/000000",
  //   "https://dummyimage.com/300x400/ff0000/ffffff",
  //   "https://dummyimage.com/300x400/00ff00/ffffff",
  //   "https://dummyimage.com/300x400/0000ff/ffffff",
  // ];

  const singleproductfetch = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/single-product/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/all-products`);
      setAllProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    singleproductfetch();
  }, [fetchProducts, singleproductfetch]);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  const accordianSlider = {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleCall = () => {
    const phoneNumber = "1234567890";
    window.location.href = `tel:${phoneNumber}`;
  };

  const validateUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className={styles.backgroundcolor}>
        <div className={styles.contentWidth}>
          <div className="container-fluid gx-0">
            <div className={` gx-0 row`}>
              <div className={`${styles.imageslider} col-lg-6 p-5`}>
                <Swiper
                  breakpoints={breakpoints}
                  slidesToScroll={1}
                  slidesToShow={1}
                >
                  {images && images.length > 0 ? (
                    images.map((image, index) => (
                      <SwiperSlide key={index + 1}>
                        <img
                          className={styles.sliderImage}
                          src={image}
                          alt={`${index + 1}`}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <div>No images available</div>
                  )}
                </Swiper>
              </div>
              <div className="col-lg-6 p-5 d-flex justify-content-center flex-column">
                <div className="d-flex justify-content-between">
                  <h2>{singleproduct.name}</h2>
                  <button
                    style={{ height: "50px" }}
                    onClick={() => setshareModal(true)}
                  >
                    <FontAwesomeIcon icon={faShare} className="fa-lg" />
                  </button>
                </div>

                <div>
                  <Rating
                    emptySymbol={<FontAwesomeIcon icon={farStar} />}
                    fullSymbol={<FontAwesomeIcon icon={fasStarSolid} />}
                    fractions={2}
                    initialRating={singleproduct.ratings}
                    readonly
                    className={styles.ratingstars}
                  />
                </div>
                <div className="pt-4">
                  {singleproduct.productstatus === "SOLD" ? (
                    <div className="d-block">
                      <Badge bg="danger pt-2 px-3 h3">
                        <h6>SOLD</h6>
                      </Badge>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <p className={styles.productdescription}>
                  {singleproduct.description}
                </p>
                <div className={styles.pricinginsingleproduct}>
                  <p className={styles.cutedprice}>
                    ${singleproduct.cutoffprice}
                  </p>
                  <p className={styles.orignalprice}>${singleproduct.price}</p>
                </div>
                <div className="row">
                  <button
                    onClick={handleCall}
                    className={`col-md-4 my-2 ${styles.productbutton}`}
                  >
                    Call
                  </button>
                  <button
                    onClick={openModal}
                    className={`col-md-4  my-2 ${styles.productbuttonactive}`}
                  >
                    Contact
                  </button>
                  {validateUser === null ? (
                    ""
                  ) : (
                    <button
                      className={`col-md-4 my-2  ${styles.productbutton}`}
                      onClick={() => setMarkSoldModal(true)}
                    >
                      Mark as Sold
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={``}>
              <div className="container-fluid">
                <div className={`row py-5`}>
                  <Swiper pagination={true} breakpoints={accordianSlider}>
                    <SwiperSlide>
                      <div
                        className={`col-lg-2 col-md-4 text-lg-start text-md-start text-center`}
                      >
                        <button
                          className={`${styles.tabbutton} ms-lg-5 my-2 ${
                            activeTab === 0 ? "active" : ""
                          }`}
                          onClick={() =>
                            handleTabClick(0, singleproduct.description)
                          }
                        >
                          Description
                        </button>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className=" col-lg-2 col-md-4 text-lg-start text-md-start text-center">
                        <button
                          className={`${styles.tabbutton}  my-2  ${
                            activeTab === 1 ? "active" : ""
                          }`}
                          onClick={() => handleTabClick(1)}
                        >
                          Additional Information
                        </button>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className=" col-lg-2 col-md-4 text-lg-start text-md-start text-center">
                        <button
                          className={`${styles.tabbutton} my-2 ${
                            activeTab === 2 ? "active" : ""
                          }`}
                          onClick={() => handleTabClick(2)}
                        >
                          Review
                        </button>
                      </div>
                    </SwiperSlide>
                  </Swiper>

                  {/* Content of active tab */}
                  {activeTab === 0 && (
                    <TabComponent1 singleproduct={singleproduct} />
                  )}
                  {activeTab === 1 && (
                    <TabComponent2 singleproduct={singleproduct} />
                  )}
                  {activeTab === 2 && (
                    <TabComponent3 singleproduct={singleproduct} />
                  )}
                </div>
              </div>
            </div>

            <div>
              {isOpen && (
                <ContactModal
                  productID={singleproduct._id}
                  closeModal={closeModal}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div>
              {markSoldModal && (
                <MarkSoldModal setMarkSoldModal={setMarkSoldModal} id={id} />
              )}

              {shareModal ? (
                <SocialShareModal setShareModal={setshareModal} id={id} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid gx-0">
        {/* Featured products */}
        <div className="container gx-0">
          <div className={`${styles.products} gx-0 row`}>
            <div className="text-center text-lg-start">
            <h2 className="py-3">Sold products</h2>
            </div>
            <div className="container">
              <div className={`${styles.products} gx-0  row`}>
                <Slider {...sliderSettings} slidesToScroll={1}>
                  {paginatedProducts.filter((item) => item._id !== id).map((product, index) => (
                    <div className="col-lg-3 d-flex justify-md-content-start justify-content-center">
                      <Card
                        role="button"
                        onClick={() =>
                          navigate(`/single-product/${product._id}`)
                        }
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
                              <p className={styles.cuttext}>${product.cutoffprice}</p>
                              <p className={styles.orignalpricetext}>${product.price}</p>
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
      </div>
    </>
  );
};

export default SingleProduct;
