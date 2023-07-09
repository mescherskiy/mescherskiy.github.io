import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { logOut } from "../slices/auth";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions);

    if (response?.error?.originalStatus === 403) {
        console.log(response);
        console.log("Sending refresh token");

        const refreshResponse = await baseQuery("/auth/refreshtoken", api, extraOptions);
        console.log(refreshResponse);

        response = await baseQuery(args, api, extraOptions);
    } else {
        api.dispatch(logOut());
    }

    return response;
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        registration: builder.mutation({
            query: credentials => ({
                url: "/auth/signup",
                method: "POST",
                body: { ...credentials }
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/signin",
                method: "POST",
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/signout",
                method: "POST",
            })
        }),
        getPublicContent: builder.query({
            query: () => ({
                url: "/test/all",
                method: "GET"
            })
        }),
        getUserBoard: builder.query({
            query: () => ("/test/user")
        }),
        getAdminBoard: builder.query({
            query: () => ("/test/admin")
        }),
    })
})

export const { 
    useLoginMutation, 
    useRegistrationMutation, 
    useLogoutMutation, 
    useGetUserBoardQuery, 
    useGetPublicContentQuery, 
    useGetAdminBoardQuery 
} = api;
export default api;