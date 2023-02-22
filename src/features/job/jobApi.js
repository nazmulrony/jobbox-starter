import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        jobPost: builder.mutation({
            query: (data) => ({
                url: "/job",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Jobs"],
        }),
        apply: builder.mutation({
            query: (data) => ({
                url: "/apply",
                method: "PATCH",
                body: data,
            }),
        }),
        question: builder.mutation({
            query: (data) => ({
                url: "/query",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Job"],
        }),
        reply: builder.mutation({
            query: (data) => ({
                url: "/reply",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Job"],
        }),
        getJobs: builder.query({
            query: () => "/jobs",
            providesTags: ["Jobs"],
        }),
        getAppliedJobs: builder.query({
            query: (email) => `/applied-jobs/${email}`,
        }),
        getJobById: builder.query({
            query: (id) => `/job/${id}`,
            providesTags: ["Job"],
        }),
    }),
});

export const {
    useJobPostMutation,
    useGetJobsQuery,
    useGetJobByIdQuery,
    useApplyMutation,
    useGetAppliedJobsQuery,
    useQuestionMutation,
    useReplyMutation,
} = jobApi;
