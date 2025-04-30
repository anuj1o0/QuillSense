import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const youtubeApi = createApi({
    reducerPath: 'youtubeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube-video-summarizer-gpt-ai.p.rapidapi.com/nutshell',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'youtube-video-summarizer-gpt-ai.p.rapidapi.com');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getVideoSummary: builder.mutation({
            query: (params) => ({
                url: 'summarize-and-translate-url',
                method: 'POST',
                body: {
                    url: params.videoUrl,
                    output_language: 'English',
                    overwrite: false
                }
            }),
        }),
    }),
})

export const { useGetVideoSummaryMutation } = youtubeApi 