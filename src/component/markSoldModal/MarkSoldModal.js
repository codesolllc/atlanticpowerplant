import React, { useEffect } from "react";
import styles from "./markSold.module.css";
import axios from "axios";
import BASE_URL from "../../Config";

const MarkSoldModal = ({ setMarkSoldModal, id }) => {
  
  
    const markSold = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/product/update-status/${id}`, {
        productstatus: "SOLD",
      });
      // console.log(res.data);
      alert("Product Marked As Sold Successfully");
      setMarkSoldModal(false);
    } catch (error) {
      alert("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h5 className="px-3">
            Are Your Sure You Want To Mark This Product As Sold?
          </h5>
          <button
            className={styles.close_modal_button}
            onClick={() => setMarkSoldModal(false)}
          >
            X
          </button>
        </div>
        <div className="d-flex justify-content-evenly">
          <button className="w-25" onClick={() => setMarkSoldModal(false)}>
            Close
          </button>
          <button className="w-25" onClick={markSold}>
            Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkSoldModal;
