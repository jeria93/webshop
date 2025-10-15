import { createSlice } from "@reduxjs/toolkit"


const initialState = {
        isloggedIn: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isloggedIn = true;
        },
        logOut: (state) => {
            state.isloggedIn = false;
        }
    }
});

export const {logIn, logOut} = loginSlice.actions;
export default loginSlice.reducer;


