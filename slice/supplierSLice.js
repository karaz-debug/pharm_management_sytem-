import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchSupplier: '',
    searchResultSupplier: [],

}

export const supplierSlice = createSlice({
    name: 'searchsupplier',
    initialState,
    reducers: {
        setSearchSupplier: (state, action) => {
            state.searchSupplier = action.payload.query;
            state.searchResultSupplier = action.payload.result;
        },
    },
});

export const { setSearchSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
