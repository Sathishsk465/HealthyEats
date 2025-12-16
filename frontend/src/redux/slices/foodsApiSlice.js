import { apiSlice } from './apiSlice';

export const foodsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFoods: builder.query({
            query: () => ({
                url: '/foods',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Food'],
        }),
        getFoodDetails: builder.query({
            query: (foodId) => ({
                url: `/foods/${foodId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createFood: builder.mutation({
            query: (data) => ({
                url: '/foods',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Food'],
        }),
        updateFood: builder.mutation({
            query: (data) => ({
                url: `/foods/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Food'],
        }),
        deleteFood: builder.mutation({
            query: (foodId) => ({
                url: `/foods/${foodId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Food'],
        }),
    }),
});

export const {
    useGetFoodsQuery,
    useGetFoodDetailsQuery,
    useCreateFoodMutation,
    useUpdateFoodMutation,
    useDeleteFoodMutation,
} = foodsApiSlice;
