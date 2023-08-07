import React from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../store/cart-slice";
import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../store/product-api";

function SideCartItem({ product, quantity, edit = true }) {
  const [removeItem, { isError, isLoading: removeItemIsLoading, isSuccess }] =
    useRemoveCartItemMutation();
  const [updateItem, { isLoading: updateIsLoading }] =
    useUpdateCartItemMutation();
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const onIncreaseHandler = () => {
    updateItem({ productId: product._id, token, type: "increase" });
    // dispatch(cartSliceActions.increaseQty(product));
    // dispatch(cartSliceActions.setCart());
  };
  const onDecreaseHandler = () => {
    updateItem({ productId: product._id, token, type: "decrease" });
    // dispatch(cartSliceActions.decreaseQty(product));
    // dispatch(cartSliceActions.setCart());
  };
  const onRemoveHandler = () => {
    // dispatch(cartSliceActions.removeItemCart(product));
    // dispatch(cartSliceActions.setCart());
    removeItem({ productId: product._id, token });
  };

  return (
    <div className="sideCartItem">
      {updateIsLoading && <div>Loading...</div>}

      {!updateIsLoading && (
        <>
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
                {quantity}
                <CaretRightOutlined onClick={onIncreaseHandler} />
              </div>
            )}
          </div>
          <div className="data_close">
            {edit && (
              <CloseOutlined
                onClick={onRemoveHandler}
                className="closeIcon icon"
              />
            )}
            <div className="price">${product.price}.00</div>
          </div>
        </>
      )}
    </div>
  );
}

export default SideCartItem;
