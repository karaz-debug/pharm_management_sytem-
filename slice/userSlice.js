import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchUser: '',
    searchUserResult: [],
};

export const userSlice = createSlice({
    name: 'usersearch',
    initialState,
    reducers: {
        setSearchResultUser: (state, action) => {
            state.searchUser = action.payload.query;
            state.searchUserResult = action.payload.result;
        },
    },
});

export const { setSearchResultUser } = userSlice.actions;



export default userSlice.reducer;
