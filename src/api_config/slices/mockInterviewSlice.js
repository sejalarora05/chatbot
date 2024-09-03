import { createSlice } from "@reduxjs/toolkit";

const mockInterviewSlice = createSlice({
  name: "MockInterviewSlice",
  initialState: {
    mockResponses: [],
    formSubmitted: false,
    mockInterviewUserRegistered: false,
    responseArr: [],
  },
  reducers: {
    mockInterviewStore: (state, action) => {
      state.mockResponses = action.payload.mockResponses;
    },
    mockInterviewStore1: (state, action) => {
      state.formSubmitted = action.payload.formSubmitted;
    },
    manageMockInterviewUserLogin: (state, action) => {
      state.mockInterviewUserRegistered = action.payload.mockInterviewUserRegistered;
    },
    mockInterviewResponseArrStore: (state, action) => {
      state.responseArr = action.payload.responseArr;
    },
  },
});
export const { mockInterviewStore, mockInterviewStore1, manageMockInterviewUserLogin, mockInterviewResponseArrStore } = mockInterviewSlice.actions;
export default mockInterviewSlice.reducer;
