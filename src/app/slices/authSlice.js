// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import AuthService from "../services/auth.service";
// import { setMessage } from "./message";

// const user = JSON.parse(localStorage.getItem("user"));

// export const register = createAsyncThunk(
//     "auth/register",
//     async ({ username, email, password }, api) => {
//         try {
//             const response = await AuthService.register(username, email, password);
//             api.dispatch(setMessage(response.data.message));
//             return response.data;
//         } catch (error) {
//             const message = 
//                 (error.response && error.response.data && error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             api.dispatch(setMessage(message));
//             return api.rejectWithValue();
//         }
//     }
// );

// export const login = createAsyncThunk(
//     "auth/login",
//     async ({ email, password }, api) => {
//         try {
//             const response = await AuthService.login(email, password);
//             return { user: response }
//         } catch (error) {
//             const message = 
//                 (error.response && error.response.data && error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             api.dispatch(setMessage(message));
//             return api.rejectWithValue();
//         }
//     }
// );

// export const logout = createAsyncThunk(
//     "auth/logout",
//     async () => {
//         await AuthService.logout();
//     }
// );

// const initialState = user
//     ? { isLoggedIn: true, user }
//     : { isLoggedIn: false, user: null }

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     extraReducers: {
//         [register.fulfilled]: (state) => {
//             state.isLoggedIn = false;
//         },
//         [register.rejected]: (state) => {
//             state.isLoggedIn = false;
//         },
//         [login.fulfilled]: (state, action) => {
//             state.isLoggedIn = true;
//             state.user = action.payload.user;
//         },
//         [login.rejected]: (state) => {
//             state.isLoggedIn = false;
//             state.user = null;
//         },
//         [logout.fulfilled]: (state) => {
//             state.isLoggedIn = false;
//             state.user = null;
//         }
//     }
// })

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => {
            const user = action.payload
            state.user = user
        },
        logOut: (state, action) => {
            state.user = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;