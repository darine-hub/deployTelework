import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getsalles = createAsyncThunk(
  'salles/getsalles',
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get('/reservation/getsalles',{
        headers: { token: localStorage.getItem('token') }});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateSalle = createAsyncThunk(
  'salle/updateSalle',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/reservation/updateSalle/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getsalles())
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteSalle = createAsyncThunk(
  "salle/deleteSalle", async (info, {rejectWithValue,dispatch}) => {
     try {
        const response = await axios.delete(`/reservation/deleteSalle/${info}`,{
          headers: { token: localStorage.getItem('token') }});
          dispatch(getsalles())
        return await response.data;
      } catch (error) {
         return rejectWithValue({ error: error.message });
      }
});
export const getsallesbydept = createAsyncThunk(
  'salles/getsallesbydept',
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/reservation/getsallesbydept/${info}`,{
        headers: { token: localStorage.getItem('token') }});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addSalle = createAsyncThunk(
  'salles/addSalle',
  async (info, { rejectWithValue , dispatch }) => {
    try {
        
      const res = await axios.post('/reservation/addSalle', info ,{
        headers: { token: localStorage.getItem('token') }
      }) 
    
      dispatch(getsalles())
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


const salleslice = createSlice({
  name: 'salles',
  initialState: {
    salles: [],
    loading: false,
    sallesErrors: null,
    salle: {},
  },
  extraReducers: {
    
    [getsalles.pending]: (state) => {
      state.loading = true;
    },
    [getsalles.fulfilled]: (state, action) => {
      state.loading = false;
      state.salles = action.payload;
      state.sallesErrors = null;
    },
    [getsalles.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getsallesbydept.pending]: (state) => {
      state.loading = true;
    },
    [getsallesbydept.fulfilled]: (state, action) => {
      state.loading = false;
      state.salles = action.payload;
      state.sallesErrors = null;
    },
    [getsallesbydept.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [addSalle.pending]: (state) => {
      state.loading = true;
    },
    [addSalle.fulfilled]: (state, action) => {
      state.loading = false;
      state.sallesErrors = null;
    },
    [addSalle.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [updateSalle.pending]: (state) => {
      state.loading = true;
    },
    [updateSalle.fulfilled]: (state, action) => {
      state.loading = false;
      state.sallesErrors = null;
    },
    [updateSalle.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [deleteSalle.pending]: (state) => {
      state.loading = true;
    },
    [deleteSalle.fulfilled]: (state, action) => {
      state.loading = false;
      state.sallesErrors = null;
    },
    [deleteSalle.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
     
  
  }, 
});


export default salleslice.reducer;
