import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchCustomer: '',
    searchCustomerResult: [],
};

export const customerSlice = createSlice({
    name: 'customersearch',
    initialState,
    reducers: {
        setSearchResultCustomer: (state, action) => {
            state.searchCustomer = action.payload.query;
            state.searchCustomerResult = action.payload.result;
        },
    },
});

export const { setSearchResultCustomer } = customerSlice.actions;



export default customerSlice.reducer;
