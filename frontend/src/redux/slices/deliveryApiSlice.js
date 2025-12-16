import { apiSlice } from './apiSlice';

export const deliveryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDeliveryPartners: builder.query({
            query: () => ({
                url: '/delivery',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Delivery'],
        }),
        addDeliveryPartner: builder.mutation({
            query: (data) => ({
                url: '/delivery',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Delivery'],
        }),
    }),
});

export const {
    useGetDeliveryPartnersQuery,
    useAddDeliveryPartnerMutation,
} = deliveryApiSlice;
