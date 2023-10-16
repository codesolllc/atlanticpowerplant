import React, { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const ProductTable = ({ products, searchValue }) => {
  // console.log(products);

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [productObj, setProductObj] = useState({});
  const [id, setId] = useState("");

  const getProdID = (obj) => {
    setUpdateModal(true);
    setProductObj(obj);
  };

  const selectData = (id) => {
    setModal(true);
    setId(id);
  };

  useEffect(() => {}, [products, searchValue]);

  const filteredProducts = searchValue
    ? products.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : products;

  return (
    <table>
      <thead>
        <tr>
          <th>_ID</th>
          <th>IMAGE</th>
          <th>PRODUCT NAME</th>
          <th>PRICE</th>
          <th>CUTOFFPRICE</th>
          <th>RATING</th>
          <th>WEIGHT</th>
          <th>HEIGHT</th>
          <th>WIDTH</th>
          <th>ProductStatus</th>
          <th>BRAND</th>
          <th>CATEGORY_ID</th>
          <th>UPDATE_PRODUCT</th>
          <th>DELETE_PRODUCT</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product._id}>
            <td>{product._id.substring(0, 9)}</td>
            <td>
              <img
                height="50px"
                width="50px"
                alt={product._id}
                src={product.featureImage}
              />
            </td>
            <td className="py-4">{product.name.substring(0, 9)}</td>
            <td className="py-4">{product.price}</td>
            <td className="py-4">{product.cutoffprice}</td>
            <td className="py-4">{product.ratings}</td>
            <td className="py-4">{product.weight}</td>
            <td className="py-4">{product.height}</td>
            <td className="py-4">{product.width}</td>
            <td className="py-4">{product.productstatus}</td>
            <td className="py-4">{product.brands}</td>
            <td className="py-4">{product.category.substring(0, 9)}</td>
            <td>
              <button onClick={() => getProdID(product)}>UPDATE ME</button>
            </td>
            <td>
              <button onClick={() => selectData(product._id)}>DELETE ME</button>
            </td>
          </tr>
        ))}
      </tbody>
      {modal ? (
        <DeleteModal products={products} id={id} setModal={setModal} />
      ) : (
        ""
      )}
      {updateModal ? (
        <UpdateModal setUpdateModal={setUpdateModal} productObj={productObj} />
      ) : (
        ""
      )}
    </table>
  );
};

export default ProductTable;
