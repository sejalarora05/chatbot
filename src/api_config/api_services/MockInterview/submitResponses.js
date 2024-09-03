import api from "../..";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitResponses: build.mutation({
      query: ({ userId, saveDataPayload }) => ({
        url: `/ai/mock/interview/save?user_id=${userId}`,
        method: "POST",
        body: saveDataPayload,
      }),
    }),
  }),
});

export const { useSubmitResponsesMutation } = extendedApi;
