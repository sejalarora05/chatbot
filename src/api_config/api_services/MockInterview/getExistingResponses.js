import api from "../..";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExistingResponses: builder.query({
      query: ({ userId }) => ({
        url: `ai/mock/interview/find?user_id=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetExistingResponsesQuery } = extendedApi;
