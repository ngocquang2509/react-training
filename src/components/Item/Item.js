import React, { useState } from "react";
import PropTypes from "prop-types";
import * as SC from "./style";
import Button from "../Button/Button";
import { useStore } from "../../store";
function Item({ name, price, category, image }) {
  const [state, dispatch] = useStore();
  const { items } = state;
  const [selectedId, setSelectedId] = useState();

  const delItem = (id) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };

  const handleDeleteItem = () => {
    delItem(selectedId);
    setSelectedId(null);
  };

  return (
    <React.Fragment>
      {items.map((items) => (
        <SC.WrappItem key={items.id}>
          <SC.ItemImageWrapper>
            <SC.ItemImg src={items.image} />
          </SC.ItemImageWrapper>
          <SC.ItemName>{items.name}</SC.ItemName>
          <SC.ItemCategory as="p">{items.category}</SC.ItemCategory>
          <SC.ItemPrice as="p">{items.price} VND</SC.ItemPrice>
          <SC.Container>
            <Button
              label="Edit"
              backgroundColor="#ffcf00"
              img="/icons/edit.svg"
            />
            <Button
              label="Delete"
              backgroundColor="#ff0000"
              img="/icons/delete.svg"
              handleClick={handleDeleteItem}
            />
          </SC.Container>
        </SC.WrappItem>
      ))}
    </React.Fragment>
  );
}

Item.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
};

export default Item;
