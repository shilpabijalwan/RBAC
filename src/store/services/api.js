import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "/api/admin",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Role", "Permission"],
  endpoints: (builder) => ({
    // Users

    createUser: builder.mutation({
      query: (body) => ({
        url: "/create-user",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/get-users",
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery } = api;
