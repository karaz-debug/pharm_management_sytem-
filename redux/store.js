import { configureStore } from '@reduxjs/toolkit'
import appointmentSlice from '../slice/appointementSlice'
import customerSlice from '../slice/categorySlice'
import drugSlice from '../slice/drugSlice'
import invoiceSlice from '../slice/invoiceSlice'
import searchSlice from '../slice/searchSlice'
import supplierSlice from '../slice/supplierSLice'
import userSlice from '../slice/userSlice'

export const store = configureStore({
    reducer: {
        search: searchSlice,
        drugsearch: drugSlice,
        customersearch: customerSlice,
        usersearch: userSlice,
        searchappointment: appointmentSlice,
        invoicesearch: invoiceSlice,
        searchsupplier: supplierSlice
    },
})