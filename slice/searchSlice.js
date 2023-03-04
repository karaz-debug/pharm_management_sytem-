import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: '',
    searchResult: [],
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResult: (state, action) => {
            state.searchQuery = action.payload.query;
            state.searchResult = action.payload.result;
        },
    },
});

export const { setSearchResult } = searchSlice.actions;



export default searchSlice.reducer;
