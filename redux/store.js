import { configureStore } from '@reduxjs/toolkit'
import categorySlice from '../slice/categorySlice'
import drugSlice from '../slice/drugSlice'
import searchSlice from '../slice/searchSlice'
import userSlice from '../slice/userSlice'

export const store = configureStore({
    reducer: {
        search: searchSlice,
        drugsearch: drugSlice,
        categorysearch: categorySlice,
        usersearch: userSlice
    },
})