import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  endpoints: (builder) => ({
    getProductsByPage: builder.query({
      query: (search) => `products${search}`,
    }),

    getProductTags: builder.query({
      query: () => `products/tags`,
    }),

    getProductById: builder.query({
      query: (id) => `product/${id}`,
      transformResponse: (res) => res.product,
    }),

    //AUTH QUERY
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

    //ADD TO CART QUERY
    getUserCart: builder.query({
      query: (token) => ({
        url: "/api/cart",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Cart"],
    }),
    //ADD ITEM TO CART
    addItemToCart: builder.mutation({
      query: ({ productId, qty, token }) => ({
        url: "/api/cart",
        method: "POST",
        body: JSON.stringify({ productId, qty }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    //REMOVE ITEM
    removeCartItem: builder.mutation({
      query: ({ productId, token }) => ({
        url: `/api/cart/${productId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    //UPDATE QUANTITY
    updateCartItem: builder.mutation({
      query: ({ productId, token, type }) => ({
        // qty is string 'increase' or 'decrease' by 1 default
        url: `/api/cart?type=${type}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetProductsByPageQuery,
  useGetProductTagsQuery,
  useGetProductByIdQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLoginGuestQuery,
  useGetUserCartQuery,
  useAddItemToCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} = productApi;
export default productApi;
