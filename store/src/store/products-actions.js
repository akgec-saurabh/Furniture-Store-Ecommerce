import { productsSliceAction } from "./products-slice";

export const getProducts = () => {
  return async (dispatch) => {
    const getProductsReq = async () => {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error("Unable to Fetch All Products");
      }
      const responseData = await response.json();

      return responseData;
    };

    try {
      const products = await getProductsReq();
      console.log(products);
      dispatch(productsSliceAction.updateProducts(products.products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductById = (productId) => {
  return async (dispatch) => {
    const getProductsReq = async () => {
      const response = await fetch(
        `http://localhost:5000/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Unable to Fetch prduct by Id");
      }
      const responseData = await response.json();

      return responseData;
    };

    try {
      const product = await getProductsReq();
      dispatch(productsSliceAction.setActiveProduct(product.product));
    } catch (error) {
      console.log(error);
    }
  };
};
