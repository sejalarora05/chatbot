import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "../utils/lodash";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export const DEFAULT_CACHE_SUBSCRIPTION_DURATION: any = 0;

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaXNoYW50LnNoYXJtYUBuZXRzbWFydHoubmV0IiwiZXhwIjoxNzEzMzQ3MDE0LCJpYXQiOjE3MTMzMzI2MTR9.sOctMOxduh-2MrwIzoaLvBjFHt75oejzehhG1yuBx3PoyfTrgeC2yKaLgzAVaiGf2bqnwI-mP3btl0tX74bS7g"

export const api = createApi({
  reducerPath: "apiReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bytmis.netsmartz.us:8283/byt/mis/v1",
    // how many seconds the data will be cached between requests
    //keepUnusedDataFor: DEFAULT_CACHE_SUBSCRIPTION_DURATION,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      // const token = get(sessionStorage, "token") || get(state, "LoginSlice.loginToken");
      // if (token) {
      headers.set("authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  }),

  // tagTypes: CACHE_TAG_TYPES,
  endpoints: () => ({}),
});
export default api;

export const api2 = createApi({
  reducerPath: "apiReducer1",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mockinterviewtoolback.netsmartz.us",
    credentials: "include", //This is to manage the token sent in the cookies of the response header
    // how many seconds the data will be cached between requests
    //minCacheTime: DEFAULT_CACHE_SUBSCRIPTION_DURATION,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),

  // tagTypes: CACHE_TAG_TYPES,
  endpoints: () => ({}),
});

export const api5 = createApi({
  reducerPath: "apiReducer1",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aibackend.netsmartz.us/api",
    credentials: "include", //This is to manage the token sent in the cookies of the response header
    // how many seconds the data will be cached between requests
    //minCacheTime: DEFAULT_CACHE_SUBSCRIPTION_DURATION,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const Token = get(state, "auth.token");

      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
      }
      return headers;
    },
  }),

  // tagTypes: CACHE_TAG_TYPES,
  endpoints: () => ({}),
});

export const api4 = createApi({
  reducerPath: "apiReducer1",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aibackend.netsmartz.us/api",
    credentials: "include", //This is to manage the token sent in the cookies of the response header
    // how many seconds the data will be cached between requests
    //minCacheTime: DEFAULT_CACHE_SUBSCRIPTION_DURATION,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const Token = get(state, "auth.token");

      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
      }
      return headers;
    },
  }),

  // tagTypes: CACHE_TAG_TYPES,
  endpoints: () => ({}),
});

export const api3 = createApi({
  reducerPath: "apiReducer2",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pwk6oxbjoi.execute-api.ap-south-1.amazonaws.com",
    // credentials: "include",
    // how many seconds the data will be cached between requests
    //minCacheTime: DEFAULT_CACHE_SUBSCRIPTION_DURATION,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),

  // tagTypes: CACHE_TAG_TYPES,
  endpoints: () => ({}),
});
