import { api2, api5 } from "../..";

const extendedApi = api5.injectEndpoints({
  endpoints: (build) => ({
    submitAudio: build.mutation({
      query: (body) => ({
        url: "/mock_audio",
        method: "POST",
        body,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
      }),
    }),
  }),
});

export const { useSubmitAudioMutation } = extendedApi;
