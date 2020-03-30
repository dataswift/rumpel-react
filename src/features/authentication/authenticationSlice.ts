import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../../app/store";

type AuthenticationState = {
    isAuthenticated: boolean;
    rememberMe: boolean;
    token: string;
};

const initialState: AuthenticationState = {
    isAuthenticated: false,
    rememberMe: false,
    token: ''
};

export const slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        authenticateWithToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        }
    },
});

export const { authenticateWithToken } = slice.actions;

export const loginWithToken = (token: string): AppThunk => dispatch => {
    dispatch(authenticateWithToken(token));
};

export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated;

export default slice.reducer;
