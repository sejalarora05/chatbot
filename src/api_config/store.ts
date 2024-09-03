import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./reducer";
import api, {api2, api3} from "./index";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["apiReducer"], //these reducers are rather big and need not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({
      serializableCheck: false,
    }),
    api.middleware,
    api2.middleware,
    api3.middleware,
  ],
  // devTools: process.env.NODE_ENV !== "production",
});
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export { store, persistor };
