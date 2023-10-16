import React from 'react'
import styles from './tabs.module.css';
import alpha from "../../assets/alpha.png";

const TabComponent3 = ({singleproduct}) => {
  return (
    <div className="container mt-3">
    <div className="row">
      <div className="col-lg-12 p-5">
        <h2>Reviews</h2>
        <img height="100px" width="100px" src={alpha} alt="Alpha" />
        <p className={styles.productextradescription}>
        {singleproduct.review}
        </p>
      </div>
    </div>
  </div>
  )
}

export default TabComponent3
