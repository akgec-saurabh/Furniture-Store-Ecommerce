import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  endpoints: (builder) => ({
    getProductsByPage: builder.query({
      query: (page) => `products?page=${page}`,
    }),
  }),
});

export const { useGetProductsByPageQuery } = apiSlice;
export default apiSlice;
