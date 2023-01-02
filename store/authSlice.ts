import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

type AuthDto = {
  isAuthenticated: boolean;
  accessToken?: string;
  userName?: string;
  email?: string;
  id?: string;
};

// Type for our state
export interface AuthState {
  authState: AuthDto;
}

// Initial state
const initialState: AuthState = {
  authState: {
    isAuthenticated: false,
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state: any, action: { type: string; payload: any }) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;
