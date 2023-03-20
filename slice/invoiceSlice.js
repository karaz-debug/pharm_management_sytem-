import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchInvoice: '',
    searchResultInvoice: [],
};

export const invoiceSlice = createSlice({
    name: 'invoicesearch',
    initialState,
    reducers: {
        setSearchResultInvoice: (state, action) => {
            state.searchInvoice = action.payload.query;
            state.searchResultInvoice = action.payload.result;
        },
    },
});

export const { setSearchResultInvoice } = invoiceSlice.actions;



export default invoiceSlice.reducer;
