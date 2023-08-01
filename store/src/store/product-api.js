import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  endpoints: (builder) => ({
    getProductsByPage: builder.query({
      query: (page) => `products?page=${page}`,
    }),
    getProductByCategory: builder.query({
      query: (category) => `products?Category=${category}`,
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
      transformResponse: (res) => res.product,
    }),
    // addToCart:builder.query({
    //   query:()
    // })
  }),
});

export const {
  useGetProductsByPageQuery,
  useGetProductByCategoryQuery,
  useGetProductByIdQuery,
} = productApi;
export default productApi;
