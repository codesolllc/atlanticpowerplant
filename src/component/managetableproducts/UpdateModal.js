import React, { useEffect, useState } from "react";
import styles from "./updateModal.module.css";
import axios from "axios";
import BASE_URL from "../../Config";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

const UpdateModal = ({ setUpdateModal, productObj }) => {
  useEffect(() => {}, []);

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
    name: productObj.name,
    description: productObj.description,
    price: productObj.price,
    additionaldescription: productObj.additionaldescription,
    review: productObj.review,
    weight: productObj.weight,
    height: productObj.height,
    width: productObj.width,
    ratings: productObj.ratings,
    cutoffprice: productObj.cutoffprice,
  });
  

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

      await axios.patch(
        `${BASE_URL}/product/update-product/${productObj._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Updated Successfully");
      setUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <Container className={styles.formContainer}>
          <Row className={styles.formWrapper}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="pt-3">Update Product</h3>
              <h3
                role="button"
                className={styles.close_modal_button}
                onClick={() => setUpdateModal(false)}
              >
                X
              </h3>
            </div>
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
                    className={`form-control ${styles.fields}`}
                    onChange={(e) => setProductstatus(e.target.value)}
                    defaultValue="Select Status"
                  >
                    <option value="Select Status" disabled>
                      Selete Status
                    </option>
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
                  defaultValue="Select Brands"
                >
                  <option value="Select Brands" disabled>
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
                  defaultValue="Select Category"
                >
                  <option disabled value="Select Category">
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
    </div>
  );
};

export default UpdateModal;
