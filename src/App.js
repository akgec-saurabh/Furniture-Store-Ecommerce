import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";
import Slider from "./components/Slider/Slider";
import Homepage from "./pages/Homepage/Homepage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RootLayout from "./components/RootLayout/RootLayout";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;

  // (
  // <div className="App">
  //   <NavBar />
  //   <Slider />
  //   <Products />
  //   <Footer />
  // </div>
  // );
}

export default App;
