import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token"),
    userEmail : localStorage.getItem("userEmail")
};

const authSlice = createSlice({
    name : "authentication",
    initialState,
    reducers : {
        login(state,action) {
            state.token = action.payload.tokenId;
            state.userEmail = action.payload.email;
            localStorage.setItem("token" , action.payload.tokenId);
            localStorage.setItem("userEmail" , action.payload.email);
        },
        logout(state) {
            state.token = null;
            state.userEmail = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
        }
    }
})


export const authActions = authSlice.actions;
export default authSlice.reducer;