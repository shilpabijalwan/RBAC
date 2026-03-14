import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/",
  prepareHeaders: (headers) => {
    const token = undefined; // e.g. from localStorage or auth slice
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
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
