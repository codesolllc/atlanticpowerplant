import React, { useEffect, useState } from "react";
import styles from "./uploadproduct.module.css";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

const UploadProduct = () => {
  // Brands
  const generatorBrands = [
    "Honda",
    "Generac",
    "Champion",
    "Westinghouse",
    "Briggs & Stratton",
    "Yamaha",
    "Firman",
    "Cummins",
    "Kohler",
    "WEN",
    "DuroMax",
    "Pulsar",
    "Sportsman",
    "DeWalt",
    "Cat",
    "Stanley",
    "Others",
  ];

  const [productFields, setProductFields] = useState({
    name: "",
    description: "",
    price: "",
    additionaldescription: "",
    review: "",
    weight: "",
    height: "",
    width: "",
    ratings: "",
    cutoffprice: "",
  });

  // eslint-disable-next-line
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const navigate = useNavigate();

  const [productstatus, setProductstatus] = useState("");

  const [brand, setBrand] = useState("");

  const [category, setCategory] = useState([]);

  const [selectedCat, setSelectedCat] = useState("");

  const [featuredImage, setFeaturedImage] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);

  const onChangeFeaturedImage = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const onChangeGalleryImage = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files); // Convert FileList to an array

    if (fileArray.length <= 3) {
      setGalleryImages(fileArray);
    } else {
      alert("You can't select more than 3 images");
    }
  };

  const handleOnChangeFields = (e) => {
    let value = e.target.value;
    if (e.target.type === "number") {
      value = Number(value); // Convert value to a number
    }
    setProductFields({ ...productFields, [e.target.name]: value });
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories/all-categories`);
      setCategory(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const postProduct = async () => {
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(productFields).some(
      (value) => value === ""
    );
    if (
      isAnyFieldEmpty ||
      !featuredImage ||
      galleryImages.length === 0 ||
      !productstatus ||
      !selectedCat ||
      !brand
    ) {
      alert("All Fields Are Required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("featuredImage", featuredImage);

      galleryImages.forEach((image) => {
        formData.append("imageUrls", image);
      });

      Object.entries(productFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("productstatus", productstatus);
      formData.append("category", selectedCat);
      formData.append("brands", brand);

      await axios.post(
        `${BASE_URL}/product/add-products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsBtnDisabled(true);
      alert("Product Uploaded Successfully");
      navigate('/');
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const validateUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {validateUser === null ? (
        <Navigate to="/" />
      ) : (
        <div className="mb-5">
          <div className="container-fluid">
            <div className={`${styles.mainheadred} row`}>
              <p className={styles.backbutton}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  role="button"
                  onClick={() => navigate("/")}
                  className="py-4 px-3 fa-2x"
                />
              </p>
            </div>
          </div>
          <Container className={styles.formContainer}>
            <Row className={styles.formWrapper}>
              <h3 className="pt-3">Create Product</h3>
              <Col lg="6">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleOnChangeFields}
                  value={productFields.name}
                  className={`my-3 ${styles.fields}`}
                  placeholder="Title"
                />

                <div className="d-flex my-3">
                  <Form.Control
                    type="number"
                    name="width"
                    value={productFields.width}
                    onChange={handleOnChangeFields}
                    className={`me-1 ${styles.fields}`}
                    placeholder="Width In CM"
                  />
                  <Form.Control
                    type="number"
                    value={productFields.height}
                    name="height"
                    onChange={handleOnChangeFields}
                    className={styles.fields}
                    placeholder="Height In Inches"
                  />
                </div>
                <div className="d-flex my-3">
                  <Form.Control
                    type="number"
                    name="weight"
                    value={productFields.weight}
                    onChange={handleOnChangeFields}
                    className={` me-1 ${styles.fields}`}
                    placeholder="Weight in KG"
                  />
                  <Form.Control
                    type="number"
                    name="cutoffprice"
                    value={productFields.cutoffprice}
                    onChange={handleOnChangeFields}
                    className={styles.fields}
                    placeholder="Cutt Off Price"
                  />
                </div>

                <div className="d-flex my-3">
                  <div className="d-block me-1 w-50">
                    <Form.Control
                      type="number"
                      name="price"
                      value={productFields.price}
                      onChange={handleOnChangeFields}
                      className={styles.fields}
                      placeholder="Price"
                    />
                  </div>

                  <div className="w-50 mb-1 d-flex align-items-center">
                    <select
                      name="cars"
                      className={`form-control ${styles.fields}`}
                      id="cars"
                      onChange={(e) => setProductstatus(e.target.value)}
                    >
                      <option value="SOLD">SOLD</option>
                      <option value="UNSOLD">UNSOLD</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex my-3">
                  <Form.Control
                    type="number"
                    max={5}
                    name="ratings"
                    onChange={handleOnChangeFields}
                    value={productFields.ratings}
                    className={`${styles.fields}`}
                    placeholder="Product's Rating"
                  />
                </div>

                <div className="w-100">
                  <select
                    className={`form-control mb-3 ${styles.fields}`}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option
                      defaultValue="Select Brands"
                      disabled
                      value="Select Brands"
                    >
                      Select Brands
                    </option>
                    {generatorBrands.map((item, index) => (
                      <option key={index + 1} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-100">
                  <select
                    name="category"
                    className={`form-control mb-3 ${styles.fields}`}
                    onChange={(e) => setSelectedCat(e.target.value)}
                  >
                    <option
                      defaultValue="Select Category"
                      disabled
                      value="Select Category"
                    >
                      Select Category
                    </option>
                    {category.map((item, i) => (
                      <option value={item._id}>{item.categoryName}</option>
                    ))}
                  </select>
                </div>

                <div className={`my-3 ${styles.imgUploadWrapper}`}>
                  <p>Drag and drop your product's featured images here.</p>
                  <label
                    htmlFor="imageUpload"
                    style={{ color: "var(--btn-color)" }}
                  >
                    Select image from your computer
                  </label>
                  <input
                    type="file"
                    onChange={onChangeFeaturedImage}
                    id="imageUpload"
                    style={{ display: "none" }}
                  />
                </div>

                <div className={`mt-3 ${styles.imgUploadWrapper}`}>
                  <p>Drag and drop your product images here.</p>
                  <label
                    htmlFor="galleryimageUpload"
                    style={{ color: "var(--btn-color)" }}
                  >
                    Select images from your computer
                  </label>
                  <input
                    type="file"
                    id="galleryimageUpload"
                    style={{ display: "none" }}
                    multiple="multiple" // Enable multiple file selection
                    onChange={onChangeGalleryImage}
                  />
                </div>
              </Col>
              <Col lg="6">
                <Form>
                  <Form.Group
                    className="mb-3 my-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      className={styles.fields}
                      placeholder="Description"
                      name="description"
                      value={productFields.description}
                      onChange={handleOnChangeFields}
                      as="textarea"
                      rows={7}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 my-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      className={styles.fields}
                      name="additionaldescription"
                      value={productFields.additionaldescription}
                      onChange={handleOnChangeFields}
                      placeholder="Additional Description"
                      as="textarea"
                      rows={8}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 my-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      className={styles.fields}
                      placeholder="Add A Default Review With Product (OPTIONAL)"
                      name="review"
                      value={productFields.review}
                      onChange={handleOnChangeFields}
                      as="textarea"
                      rows={7}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-block">
                  <button className="my-4" onClick={postProduct}>
                    Submit
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default UploadProduct;
