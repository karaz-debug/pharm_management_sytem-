import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchCategory: '',
    searchCategoryResult: [],
};

export const categorySlice = createSlice({
    name: 'categorysearch',
    initialState,
    reducers: {
        setSearchResultCategory: (state, action) => {
            state.searchCategory = action.payload.query;
            state.searchCategoryResult = action.payload.result;
        },
    },
});

export const { setSearchResultCategory } = categorySlice.actions;



export default categorySlice.reducer;
