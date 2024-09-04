import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatBotModels: [
    { label: "Llama3.1", value: "llama3.1" },
    { label: "OpenAi", value: "openai" },
  ],
  selectedModel: { value: "openai" },
};

const chatBotSlice = createSlice({
  name: "chatbot",
  initialState: initialState,
  reducers: {
    setSelectedChatBotModel(state, action) {
      state.selectedModel = action.payload;
    },
  },
});

export const { setSelectedChatBotModel } = chatBotSlice.actions;
export const chatBotReducer = chatBotSlice.reducer;
