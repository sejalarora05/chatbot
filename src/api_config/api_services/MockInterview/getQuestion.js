import { api2, api4 } from "../..";

const extendedApi = api4.injectEndpoints({
  endpoints: (builder) => ({
    getQuestion: builder.query({
      query: (qIndex) => ({
        url: `/mock_question?index=${qIndex}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetQuestionQuery } = extendedApi;
