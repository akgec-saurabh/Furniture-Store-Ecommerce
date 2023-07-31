import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import RootLayout from "./Layout/RootLayout";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import { getToken } from "./store/auth-actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
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
      ],
      errorElement: <p>Error Page</p>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
