import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import RootLayout from "./components/RootLayout";
import CartPage from "./pages/CartPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/product/:productId",
          element: <ProductPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
