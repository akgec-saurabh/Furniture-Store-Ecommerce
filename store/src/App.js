import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import RootLayout from "./Layout/RootLayout";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";
import { authSliceActions } from "./store/auth-slice";

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
      ],
      errorElement: <p>Error Page</p>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
