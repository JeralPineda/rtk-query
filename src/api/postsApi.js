import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API = process.env.REACT_APP_API || 'http://localhost:3005';

export const postsApi = createApi({
  reducerPath: 'postsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API,
  }),

  // Revalidacion: comprobar que la data del cliente sea igual que la del servidor en caso de cambios

  // Tiempo de la data en cache de la app en general
  keepUnusedDataFor: 60,

  // Revalidacion de la data en el componente

  // Se pueden hacer dentro de los hooks de las peticiones
  refetchOnMountOrArgChange: true,

  // Revalidacion al hacer focus en pagina p pestañas
  refetchOnFocus: true,

  // Revalidacion al esta off line y conectarse de nuevo
  refetchOnReconnect: true,

  // Actualizar la data al hacer un fetch
  tagTypes: ['Posts'],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',

      // Actualizar la data al hacer un fetch
      providesTags: ['Posts'],

      // Tiempo de la data en cache de la app por cada endpoints
      // keepUnusedDataFor: 5,
    }),
    getPostById: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    // Mutation
    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),

      // Actualizar la data al hacer un fetch
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useAddNewPostMutation } = postsApi;
