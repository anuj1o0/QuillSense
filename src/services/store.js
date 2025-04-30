import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";
import { youtubeApi } from "./youtube";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [youtubeApi.reducerPath]: youtubeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(articleApi.middleware)
            .concat(youtubeApi.middleware)
})