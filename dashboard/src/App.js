import RootLayout from "./Layout/RootLayout";
import Homepage from "./pages/Homepage/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Prodcuts from "./pages/Prodcuts";
import ProductEdit from "./pages/ProductEdit/ProductEdit";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "products",
          element: <Prodcuts />,
        },
        {
          path: "add-product",
          element: <Homepage />,
        },
        {
          path: "product/:productId",
          element: <ProductEdit />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
