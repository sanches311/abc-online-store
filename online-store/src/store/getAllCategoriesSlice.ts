import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://fakestoreapi.com/'}),
    endpoints: (builder) => (
        {
            getAllCategories: builder.query<Array<string>, void> (
                {
                    query: () => 'categories',
                }
            )
        }
    )
})
export const {useGetAllCategoriesQuery}= storeApi