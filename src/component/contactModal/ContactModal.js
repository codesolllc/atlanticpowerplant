import React, { useState } from "react";
import styles from "./contactmodal.module.css";
import axios from "axios";
import BASE_URL from "../../Config";

const ContactModal = ({ closeModal, productID, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/contact/send-message`, {
        productId: productID,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setIsBtnDisabled(true);
      alert("Your Message Has Been Sent Successfully");
      setIsOpen(false);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    // Handle form submission logic
    // console.log(formData);
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h4>Contact us for this product</h4>
          <button className={styles.close_modal_button} onClick={closeModal}>
            X
          </button>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${styles.input} ${styles.textarea}`}
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="name">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className={`${styles.input} ${styles.textarea}`}
                value={formData.phone}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`${styles.input} ${styles.textarea}`}
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                className={`${styles.input} ${styles.textarea}`}
                onChange={handleFormChange}
              ></textarea>
            </div>

            <div className={styles.button_alingment}>
              <button className={styles.button} disabled={isBtnDisabled} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
