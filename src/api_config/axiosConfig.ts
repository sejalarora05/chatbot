import axios from "axios";

export const axiosHeader = {
  headers: {
    "Content-Type": "application/json", // Set content type to JSON
  },
};

export const axiosMultiPartHeader = {
  headers: { "Content-Type": "multipart/form-data" },
};

export function getRequest(URL: string, headerConfig: any) {
  return axios.get(`${URL}`, headerConfig);
}

export function postRequest(URL: string, payload: any, headerConfig: any) {
  return axios.post(`${URL}`, payload, headerConfig);
}

export function postStreamingRequest(
  URL: string,
  payload: any,
  headerConfig: any
) {
  return axios.post(`${URL}`, payload, {
    ...headerConfig,
    responseType: "stream",
  });
}

export function patchRequest(URL: string, headerConfig: any, payload: any) {
  return axios.patch(`${URL}`, payload, headerConfig);
}

export function deleteRequest(URL: string, headerConfig: any, payload: any) {
  return axios.delete(`${URL}`, headerConfig);
}
