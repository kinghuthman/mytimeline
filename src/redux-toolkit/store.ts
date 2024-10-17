import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import timelineReducer, {
  middleware as timelineApiMiddleware,
} from "./services/friends";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer, timelineApi: timelineReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timelineApiMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
