import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addNewreservation = createAsyncThunk(
  'reservations/addnewreservation',
  async (info, { rejectWithValue, dispatch }) => {
   
    try {
      const res = await axios.post('/reservation/addreservations', info, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getreservationsbyId(info.userId))
      dispatch(getreservations())
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const getreservations = createAsyncThunk(
  "reservations/getreservations", async (_, thunkAPI) => {
     try {
        const response = await axios.get('/reservation/getreservations',{
          headers: { token: localStorage.getItem('token') }});//where you want to fetch data
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
export const getreservationsbyId = createAsyncThunk(
  "reservationbyId/getreservationsbyId", async (info, thunkAPI) => {
     try {
        const response = await axios.get(`/reservation/getreservationsbyId/${info}`,{
          headers: { token: localStorage.getItem('token') }});//where you want to fetch data
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
export const updateReservation = createAsyncThunk(
  'reservation/updateReservation',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/reservation/updateReservation/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getreservationsbyId(info.userId));
      dispatch(getreservations())
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteReservation = createAsyncThunk(
  "reservation/deleteReservation", async (info, {rejectWithValue,dispatch}) => {
     try {
        const response = await axios.delete(`/reservation/deleteReservation/${info.id}`,{
          headers: { token: localStorage.getItem('token') }});
          dispatch(getreservationsbyId(info.user))
          dispatch(getreservations())
        return await response.data;
      } catch (error) {
         return rejectWithValue({ error: error.message });
      }
});


const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    reservationbyId:[],
    clickedSalle : null ,
    loading: false,
    reservationErrors: null,
    reservationsErrors: null,
  
    
  },
  reducers:{
    clicksalle:(state,action)=>{
      state.clickedSalle=action.payload
  }},
  extraReducers: {
    [addNewreservation.pending]: (state) => {
      state.loading = true;
    },
    [addNewreservation.fulfilled]: (state, action) => {
      state.loading = false;
      state.reservation = action.payload;
      state.reservationErrors = null;
    },
    [addNewreservation.rejected]: (state, action) => {
      state.loading = false;
      state.reservationErrors = action.payload;
    },
    [getreservations.pending]: (state) => {
      state.loading = true;
    },
    [getreservations.fulfilled]: (state, action) => {
      state.loading = false;
      state.reservations = action.payload;
      state.reservationErrors = null;

    },
    [getreservations.rejected]: (state, action) => {
      state.loading = false;
      state.reservationErrors = action.payload;
    },
    [getreservationsbyId.pending]: (state) => {
      state.loading = true;
    },
    [getreservationsbyId.fulfilled]: (state, action) => {
      state.loading = false;
      state.reservationbyId = action.payload;
      state.reservationErrors = null;
    },
    [getreservationsbyId.rejected]: (state, action) => {
      state.loading = false;
      state.reservationErrors = action.payload;
    },
    [deleteReservation.pending]: (state) => {
      state.loading = true;
    },
    [deleteReservation.fulfilled]: (state, action) => {
      state.loading = false;
      state.reservationErrors = null;
    },
    [deleteReservation.rejected]: (state, action) => {
      state.loading = false;
      state.reservationErrors = action.payload;
    },
    [updateReservation.pending]: (state) => {
      state.loading = true;
    },
    [updateReservation.fulfilled]: (state, action) => {
      state.loading = false;
      state.reservationErrors = null;
    },
    [updateReservation.rejected]: (state, action) => {
      state.loading = false;
      state.reservationErrors = action.payload;
    },
    
  }, 
});
export const {clicksalle} = reservationSlice.actions


export default reservationSlice.reducer;
