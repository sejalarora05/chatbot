import { api2 } from "../..";

const extendedApi = api2.injectEndpoints({
  endpoints: (build) => ({
    postUserInfo: build.mutation({
      query: (body) => ({
        url: "/userinfo",
        method: "POST",
        body,
      }),
      // Add headers if necessary
      headers: {
        // Add any required headers here
        // For example:
        'Content-Type': 'application/json',
        'Accept':'*/*'
      },
    }),
  }),
});

export const { usePostUserInfoMutation } = extendedApi;