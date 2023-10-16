import React from 'react'
import styles from './tabs.module.css';

const TabComponent2 = ({singleproduct}) => {

  
  return (
    <div className="container mt-3">
    <div className="row">
      <div className="col-lg-12 p-5">
        <h2>Additional Information</h2>
      </div>
      <div className={`${styles.secondcomponentaccordingdata} col-lg-6`}>
        <div className="col-lg-3">
          <h5>Height</h5>
        </div>
        <div className="col-lg-3">
          <h6>{singleproduct.height} Cm's</h6>
        </div>
      </div>
      <div className={`${styles.secondcomponentaccordingdata} col-lg-6`}>
        <div className="col-lg-3">
          <h5>Width</h5>
        </div>
        <div className="col-lg-3">
          <h6>{singleproduct.width} Cm's</h6>
        </div>
      </div>

      <div className={`${styles.secondcomponentaccordingdata} col-lg-6 mt-3`}>
        <div className="col-lg-3">
          <h5>Weight</h5>
        </div>
        <div className="col-lg-3">
          <h6>{singleproduct.weight} Kg's</h6>
        </div>
      </div>

      <div className={`${styles.secondcomponentaccordingdata} col-lg-6 mt-3`}>
        <div className="col-lg-3">
          <h5>Brand</h5>
        </div>
        <div className="col-lg-3">
          <h6>{singleproduct.brands}</h6>
        </div>
      </div>

      <div className={`col-lg-12 mt-3 p-5`}>
        <h5>More About Product</h5>
        <p className={styles.productextradescription}>
        {singleproduct.additionaldescription}
        </p>
      </div>
    </div>
  </div>
  )
}

export default TabComponent2
