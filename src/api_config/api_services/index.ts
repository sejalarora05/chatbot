import { AxiosError } from "axios";
import {
  GetProductDetailsApiUrl,
  ProductsSearchApiUrl,
  articleSummarizationApiUrl,
  chatBotApiUrl,
  chatUrl,
  codeEvaluationSummaryApiUrl,
  codeEvaluationUserApiUrl,
  conversationListUrl,
  deleteExistingConvUrl,
  emailSentApiUrl,
  getArticlesApiUrl,
  huggingFaceApiUrl,
  langChainApiUrl,
  listOrganizationUrl,
  loadExistingConvUrl,
  loginApiUrl,
  mcqApiUrl,
  multiTransalationDocApiUrl,
  multiTransalationTextApiUrl,
  multiTranslationApiUrl,
  newChatCreateUrl,
  resetPasswordApiUrl,
  signupApiUrl,
  speechToTextApiUrl,
  technicalInterviewApiUrl,
  technicalInterviewSolutionApiUrl,
  translationApiUrl,
} from "../apiConfigUrls";
import {
  axiosHeader,
  axiosMultiPartHeader,
  getRequest,
  postRequest,
  postStreamingRequest,
} from "../axiosConfig";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../store";
import { toast } from "react-toastify";

export const loginApi = async (payload: any) => {
  try {
    const response = await postRequest(loginApiUrl, payload, axiosHeader);
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const tagsApi = async (username: any) => {
  try {
    const response = await getRequest(
      `https://aibackend.netsmartz.us/auth/tags?email=${username}`,
      axiosHeader
    );
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const signUpApi = async (payload: any) => {
  try {
    const response = await postRequest(signupApiUrl, payload, axiosHeader);
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const emailSentApi = async (payload: any) => {
  try {
    const response = await postRequest(emailSentApiUrl, payload, axiosHeader);
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const resetPasswordApi = async (payload: any) => {
  try {
    const response = await postRequest(
      resetPasswordApiUrl,
      payload,
      axiosHeader
    );
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const chatBotApi = async (payload: any) => {
  try {
    const response = await postRequest(chatBotApiUrl, payload, axiosHeader);
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const GetAllOrganizationApi = async () => {
  try {
    const response = await getRequest(listOrganizationUrl, axiosHeader);
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const getHistoryApi = async (payload: any) => {
  try {
    const response = await postRequest(
      conversationListUrl,
      payload,
      axiosHeader
    );
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const newChatCreateApi = async (payload: any) => {
  try {
    const response = await postRequest(newChatCreateUrl, payload, axiosHeader);
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

export const loadExistingChatApi = async (payload: any) => {
  try {
    const response = await postRequest(
      loadExistingConvUrl,
      payload,
      axiosHeader
    );
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};

// export const chatStartApi = async (
//   payload: any,
//   setConversation: Dispatch<SetStateAction<{ content: string; type: string }[]>>
// ) => {
//   const state = store.getState();
//   const token = state.auth.token;

//   if (!token) {
//     console.error("No token found in state");
//     return;
//   }

//   try {
//     const response = await fetch(chatUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const reader = response.body?.getReader();
//     const decoder = new TextDecoder();
//     let aiMessage = "";

//     const readChunk = async () => {
//       if (!reader) return;

//       const { done, value } = await reader.read();
//       if (done) {
//         console.log("Streaming complete");
//         return;
//       }

//       if (value) {
//         aiMessage += decoder.decode(value, { stream: true });

//         setConversation((prevState) => {
//           const history = prevState.slice(0, -1);
//           return [...history, { content: aiMessage, type: "ai" }];
//         });
//       } else {
//         console.warn("Received empty chunk");
//       }

//       readChunk(); // Continue reading the next chunk
//     };

//     readChunk();
//   } catch (err: any) {
//     console.error("Error during streaming:", err.message);
//     toast.error("Error during streaming: " + err.message);
//     setConversation((prevState) => prevState.slice(0, -2));
//     // Handle error
//   }
// };

export const chatStartApi = async (
  payload: any,
  setConversation: Dispatch<SetStateAction<{ content: string; type: string }[]>>
) => {
  const state = store.getState();
  const token = state.auth.token;

  if (!token) {
    console.error("No token found in state");
    return;
  }

  try {
    const response = await fetch(chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let aiMessage = "";
    let previousChunkEndsWithCR = false;

    const readChunk = async () => {
      if (!reader) return;

      const { done, value } = await reader.read();
      if (done) {
        console.log("Streaming complete");
        return;
      }

      if (value) {
        let chunk = decoder.decode(value, { stream: true });

        if (previousChunkEndsWithCR && chunk[0] === "\n") {
          chunk = chunk.slice(1); // Remove the LF if it follows a CR
        }

        // Add to aiMessage and check for line breaks
        aiMessage += chunk;

        // Split message by new lines and update conversation
        const lines = aiMessage.split(/\r?\n/);
        // aiMessage = lines.pop() || ""; // Preserve the last line as it may be incomplete
        // setConversation((prevState) => {
        //   //           const history = prevState.slice(0, -1);
        //   //           return [...history, { content: aiMessage, type: "ai" }];
        //   //         });
        setConversation((prevState) => {
          const history = prevState.slice(0, -1);

          let finalMessage = "";
          lines.forEach((it) => (finalMessage += it + "\n"));
          return [
            ...history,
            { content: finalMessage, type: "ai" },
            // ...lines.map((line) => ({ content: line, type: "ai" })),
          ];
        });

        previousChunkEndsWithCR = chunk[chunk.length - 1] === "\r";
      } else {
        console.warn("Received empty chunk");
      }

      readChunk(); // Continue reading the next chunk
    };

    readChunk();
  } catch (err: any) {
    console.error("Error during streaming:", err.message);
    toast.error("Error during streaming: " + err.message);
    setConversation((prevState) => prevState.slice(0, -2));
    // Handle error
  }
};

export const deleteExistingChatApi = async (payload: any) => {
  try {
    const response = await postRequest(
      deleteExistingConvUrl,
      payload,
      axiosHeader
    );
    const data = response.data;
    const resultObj = { success: true, data: data };
    return resultObj;
  } catch (err) {
    const error = err as AxiosError;
    const errorObj = { success: false, data: error };
    return errorObj;
  }
};
