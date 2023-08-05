import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import RootLayout from "./Layout/RootLayout";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";
import OrderTracking from "./pages/OrderTracking";
import { authSliceActions } from "./store/auth-slice";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import MyAccount from "./pages/MyAccount";
import WishList from "./pages/WishList";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authSliceActions.getToken());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "product/:productId",
          element: <ProductPage />,
        },
        {
          path: "category/:categoryname",
          element: <Homepage />,
        },
        {
          path: "tag/:tagname",
          element: <Homepage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },

        //Can create nested children with outlet for checkout
        {
          path: "checkout/success",
          element: <CheckoutSuccess />,
        },
        {
          path: "/order-tracking",
          element: <OrderTracking />,
        },
        {
          path: "/my-account",
          element: <MyAccount />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/wishlist",
          element: <WishList />,
        },
      ],

      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
