import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.teleport.org/api/countries",
  }),
  endpoints: (builder) => ({
    getAllCountry: builder.query({
      query: (name) => "",
      transformResponse: (response) =>
        response._links["country:items"].map((country) => ({
          code: country.href.split(":")[2].replace("/", ""),
          name: country.name,
        })),
    }),
    getStates: builder.query({
      query: (aplha2) => `iso_alpha2%3A${aplha2}/admin1_divisions`,
      transformResponse: (response) =>
        response._links["a1:items"].map((state) => ({
          code: state.href.split(":")[3].replace("/", ""),
          name: state.name,
        })),
    }),
    getAllCities: builder.query({
      query: ({ code, stateCode }) =>
        `iso_alpha2%3A${code}/admin1_divisions/geonames%3A${stateCode}/cities/`,
      transformResponse: (response) =>
        response._links["city:items"].sort((a, b) => a.name > b.name),
    }),
  }),
});

export const {
  useGetAllCountryQuery,
  useGetStatesQuery,
  useGetAllCitiesQuery,
} = countryApi;

export default countryApi;
