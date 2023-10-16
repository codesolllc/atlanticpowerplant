import React, { useEffect } from "react";
import styles from "./deleteModal.module.css";
import axios from "axios";
import BASE_URL from "../../Config";

const DeleteModal = ({ products ,setModal, id }) => {


    const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/product/delete-product/${id}`
      );
      // console.log(res.data);
      setModal(false);
      // console.log(id);
    } catch (error) {
      alert("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    
  }, [products])
  

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h5>Are Your Sure You Want To Delete This?</h5>
          <button
            className={styles.close_modal_button}
            onClick={() => setModal(false)}
          >
            X
          </button>
        </div>
        <div className="d-flex justify-content-evenly">
          <button className="w-25" onClick={() => setModal(false)}>
            Close
          </button>
          <button className="w-25" onClick={deleteProduct}>
            Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
