import React from "react";
import "./SideCartItem.scss";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../../../store/cart-slice";

function SideCartItem({ product }) {
  const dispatch = useDispatch();
  const onIncreaseHandler = () => {
    dispatch(cartSliceActions.increaseQty(product));
  };
  const onDecreaseHandler = () => {
    dispatch(cartSliceActions.decreaseQty(product));
  };
  const onRemoveHandler = () => {
    dispatch(cartSliceActions.removeItemCart(product));
  };

  return (
    <div className="sideCartItem">
      <img src={product.image} alt="product" />
      <div className="item_data">
        <div className="name">{product.name}</div>
        <div className="quantity">
          <span className="qty_tag">Qty</span>
          <CaretLeftOutlined onClick={onDecreaseHandler} />
          {product.qty}
          <CaretRightOutlined onClick={onIncreaseHandler} />
        </div>
      </div>
      <div className="data_close">
        <CloseOutlined onClick={onRemoveHandler} className="closeIcon icon" />
        <div className="price">${product.price}.00</div>
      </div>
    </div>
  );
}

export default SideCartItem;
