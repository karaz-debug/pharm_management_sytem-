import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchDrug: '',
    searchResultDrug: [],
};

export const drugSlice = createSlice({
    name: 'drugsearch',
    initialState,
    reducers: {
        setSearchResultDrug: (state, action) => {
            state.searchDrug = action.payload.query;
            state.searchResultDrug = action.payload.result;
        },
    },
});

export const { setSearchResultDrug } = drugSlice.actions;



export default drugSlice.reducer;
