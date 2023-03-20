import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchRange: '',
  searchRangeappointments: [],
  searchPatientName: '', // add this line
  searchPatientResult: [],
}

export const appointmentSlice = createSlice({
  name: 'searchappointment',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.searchRangeappointments = action.payload.result;
      state.searchRange = action.payload.range;
    },
    setSearchPatientName: (state, action) => { // add this reducer
      state.searchPatientName = action.payload.query;
      state.searchPatientResult = action.payload.result;
    },
  },
});

export const { setAppointments, setSearchPatientName } = appointmentSlice.actions;

export default appointmentSlice.reducer;
