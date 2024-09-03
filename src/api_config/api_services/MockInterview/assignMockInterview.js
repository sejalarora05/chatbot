import api from "../..";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    assignMockInterview: build.mutation({
      query: ({ id }) => ({
        url: `/ai/assessment/sendEmail?user_id=${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAssignMockInterviewMutation } = extendedApi;
