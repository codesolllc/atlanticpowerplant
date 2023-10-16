import React, { useState } from "react";
import styles from "./adddcategory.module.css";
import axios from "axios";
import BASE_URL from "../../Config";

const AddCategoryModal = ({ closeModal, setIsOpen }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const AddingCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/categories/add-category`, formData);
      alert("Category Added successfully");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      alert("This Category Already Exist");
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h4>ADD CATEGORY</h4>
          <button className={styles.close_modal_button} onClick={closeModal}>
            X
          </button>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={AddingCategory}>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="category">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={formData.categoryName}
                className={`${styles.input} ${styles.textarea}`}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.button_alingment}>
              <button className={styles.button} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
