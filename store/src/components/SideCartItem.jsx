import React from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../store/cart-slice";

function SideCartItem({ product, edit = true }) {
  const dispatch = useDispatch();
  const onIncreaseHandler = () => {
    dispatch(cartSliceActions.increaseQty(product));
    dispatch(cartSliceActions.setCart());
  };
  const onDecreaseHandler = () => {
    dispatch(cartSliceActions.decreaseQty(product));
    dispatch(cartSliceActions.setCart());
  };
  const onRemoveHandler = () => {
    dispatch(cartSliceActions.removeItemCart(product));
    dispatch(cartSliceActions.setCart());
  };

  return (
    <div className="sideCartItem">
      <img src={product.mainImage} alt="product" />
      <div className="item_data">
        <div className="name">
          {product.name}
          {!edit && <span>X{product.qty}</span>}
        </div>
        {edit && (
          <div className="quantity">
            <span className="qty_tag">Qty</span>
            <CaretLeftOutlined onClick={onDecreaseHandler} />
            {product.qty}
            <CaretRightOutlined onClick={onIncreaseHandler} />
          </div>
        )}
      </div>
      <div className="data_close">
        {edit && (
          <CloseOutlined onClick={onRemoveHandler} className="closeIcon icon" />
        )}
        <div className="price">${product.price}.00</div>
      </div>
    </div>
  );
}

export default SideCartItem;
