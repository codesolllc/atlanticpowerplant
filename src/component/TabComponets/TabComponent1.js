import React from 'react'
import styles from './tabs.module.css';

const TabComponent1 = ({singleproduct}) => {


  return (
    <div className="container mt-3">
    <div className="row">
      <div className="col-lg-12 p-5">
        <h2>Description</h2>
        <p className={styles.productextradescription}>
          {singleproduct.additionaldescription}
        </p>
      </div>
    </div>
  </div>
  )
}

export default TabComponent1
