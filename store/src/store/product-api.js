import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  endpoints: (builder) => ({
    getProductsByPage: builder.query({
      query: (page) => `products?page=${page}`,
    }),
    getProductByCategory: builder.query({
      query: ({ categoryname, page }) =>
        `products/category/${categoryname}?page=${page}`,
    }),
    getProductTags: builder.query({
      query: () => `products/tags`,
    }),
    getProductByTags: builder.query({
      query: (tagname) => `products/tag/${tagname}`,
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
      transformResponse: (res) => res.product,
    }),
    // addToCart:builder.query({
    //   query:()
    // })

    loginGuest: builder.query({
      query: () => "api/auth/guest",
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetProductsByPageQuery,
  useGetProductByCategoryQuery,
  useGetProductTagsQuery,
  useGetProductByTagsQuery,
  useGetProductByIdQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLoginGuestQuery,
} = productApi;
export default productApi;
