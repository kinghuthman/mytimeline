import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const timelineApi = createApi({
  reducerPath: "timelineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/friends/",
  }),
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => `timeline_admin`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFriendsQuery, middleware } = timelineApi;
export default timelineApi.reducer;
