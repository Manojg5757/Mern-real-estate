import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userSlice },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      // Add your custom middleware here, if any
    ];
  },
});
