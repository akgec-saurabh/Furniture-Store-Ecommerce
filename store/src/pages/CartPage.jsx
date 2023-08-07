import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";
import CartTotal from "../components/CartTotal";
import { Link, useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { saveCart } from "../store/cart-actions";
import { useGetUserCartQuery } from "../store/product-api";
function CartPage() {
  const { cart, total: localTotal } = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const { data, isFetching, isSuccess, isLoading } = useGetUserCartQuery(
    token,
    {
      skip: !token,
    }
  );
  const [total, setTotal] = useState(localTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTotal = () => {
    let tempTotal = 0;
    for (let item of cart) {
      tempTotal += item.qty * item.price;
    }
    setTotal(tempTotal);
  };

  const onContinueShoppingHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    // getTotal();

    console.log("redered Cart");
  }, [cart.length]);

  const onUpdateHandler = () => {
    // // setTotal(tempTotal);
    // // getTotal();
    // //updating total only on update click
    // setTotal(localTotal);
    // dispatch(
    //   saveCart({
    //     userId: "64c5a93cfe443cf3bd99374a",
    //     products: cart.map((product) => {
    //       return {
    //         productId: product.id,
    //         quantity: product.qty,
    //       };
    //     }),
    //   })
    // );
  };

  console.log("rendering cartPage");

  return (
    <>
      {!token && <p>Login to Save To Cart</p>}
      {token && (
        <div className="cartpage">
          <div className="cartpage_container">
            {data?.cart.products.length === 0 && (
              <div className="se_empty">
                <CloseCircleOutlined className="icon" />
                <div>No products in the cart.</div>

                <button
                  onClick={onContinueShoppingHandler}
                  className="btn cp-btn"
                >
                  Continue Shopping
                </button>
              </div>
            )}
            {data?.cart.products.length !== 0 && (
              <>
                <div className="shoppingCart">
                  <div className="shoppingCart_head">Shopping Cart</div>
                  {data?.cart.products.map((item) => (
                    <div
                      key={item.productId._id}
                      className="sideCartItem_wrapper"
                    >
                      <SideCartItem
                        product={item.productId}
                        quantity={item.quantity}
                      />
                    </div>
                  ))}
                  <div className="btn_container">
                    <button
                      onClick={onContinueShoppingHandler}
                      className="btnw"
                    >
                      Continue Shopping
                    </button>
                    <button onClick={onUpdateHandler} className="btnw">
                      Update Cart
                    </button>
                  </div>
                </div>
                <div className="cartpage-carttotal-container">
                  <div className="shoppingCart_head">Cart Total</div>

                  <div>
                    <CartTotal total={data?.total} />
                    <Link to="/checkout">
                      <button className="btn ct-btn">
                        Proceed to checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartPage;
