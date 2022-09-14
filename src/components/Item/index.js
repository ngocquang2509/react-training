import React, { useState, useContext } from 'react';
import { StoreContext } from '../../store';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import DeletePopup from '../DeletePopup';
import Popup from '../common/Popup';
import * as SC from './style'; // SC is stands for Styled-Components

const Item = ({ products, query }) => {
  const { deleteProduct, updateProduct } = useContext(StoreContext);
  const [selectProductUpdate, setSelectProductUpdate] = useState(null);
  const [selectProductDelete, setSelectProductDelete] = useState(null);

  const handelOpenDeletePopup = (id) => {
    setSelectProductDelete(id);
  };

  const handleClosePopup = () => {
    setSelectProductUpdate(null);
  };

  const handleCloseDeletePopup = () => {
    setSelectProductDelete(null);
  };

  const handleDelete = () => {
    deleteProduct(selectProductDelete);
    setSelectProductDelete(null);
  };

  const handleUpdate = (product) => {
    updateProduct(product);
  };

  return (
    <>
      {products
        .filter((product) => product.productName.toLowerCase().includes(query))
        .map((product) => (
          <SC.WrappItem key={product.id}>
            <SC.ItemImageWrapper>
              <SC.ItemImg src={product.productImage} />
            </SC.ItemImageWrapper>
            <SC.ItemName>{product.productName}</SC.ItemName>
            <SC.ItemCategory as="p">{product.productCategory}</SC.ItemCategory>
            <SC.ItemPrice as="p">${product.productPrice}</SC.ItemPrice>
            <SC.Container>
              <Button
                label="Edit"
                backgroundColor="#ffcf00"
                img="/icons/edit.svg"
                handleClick={() => setSelectProductUpdate(product)}
              />
              <Button
                label="Delete"
                backgroundColor="#ff0000"
                img="/icons/delete.svg"
                handleClick={() => handelOpenDeletePopup(product.id)}
              />
              {selectProductDelete && <DeletePopup closeDeleteModal={handleCloseDeletePopup} onSubmit={handleDelete} />}
              {selectProductUpdate && (
                <Popup
                  products={selectProductUpdate}
                  closeModal={handleClosePopup}
                  onIsUpdate={handleUpdate}
                  title="Update Product"
                />
              )}
            </SC.Container>
          </SC.WrappItem>
        ))}
    </>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  images: PropTypes.string,
};

export default Item;
