import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    tagTypes: ["Auth"],
    baseUrl: import.meta.env.VITE_API_BASE_URL || "/api/admin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: [{ type: "Auth" }],
      transformResponse: (response) => {
        return response;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
