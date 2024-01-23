import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://149.56.68.156:6060/api/' }),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: ({ sid, rid, page, size }) => {
        return {
          url: `chats?senderId=${sid}&receiverId=${rid}&page=${page}&pageSize=${size}`,
          method: 'GET',
        };
      },
    }),
    sentNewMessage: builder.mutation({
      query: ({ data }) => ({
        url: 'chats',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: data,
      }),
    }),
  }),
})
export const {
  useGetConversationsQuery,
  useSentNewMessageMutation
} = authApi