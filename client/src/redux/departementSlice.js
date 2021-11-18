import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const getDepartement = createAsyncThunk(
    'departement/getDepartement',
    async (info, { rejectWithValue }) => {
      try {
          
        const res = await axios.get('departements/listDepartement',{
          headers: { token: localStorage.getItem('token') }
        }) 
        
       
        return res.data;
      }
      
      catch (error) {
        return rejectWithValue(
          error.response.data.message
            ? error.response.data.message
            : error.response.data.errors.password.msg
        );
      }
    }
  );

  export const postNewDepartement = createAsyncThunk(
    'departement/postNewdepartement',
    async (info, { rejectWithValue ,dispatch}) => {
      try {
          
        const res = await axios.post(`departements/addDepartement`, info ,{
          headers: { token: localStorage.getItem('token') }
        }) 
        dispatch(getDepartement ());
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

  export const updateDepartement = createAsyncThunk(
    'departement/updateDepartement',
    async (info, { rejectWithValue, dispatch }) => {
     
      try {
        const res = await axios.put(`departements/updateDepartement/${info.id}`, info.data, {
          headers: { token: localStorage.getItem('token') },
        });
        dispatch(getDepartement ());
        return res.data;
      
       
       
      } catch (error) {
      
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const deleteDepartement = createAsyncThunk(
    'departement/deleteDepartement',
    async (id, { rejectWithValue, dispatch }) => {
      try {
        const res = await axios.delete(`departements/deleteDepartement/${id}`, {
          headers: { token: localStorage.getItem('token') },
        });
        dispatch(getDepartement ());
        return res.data;
        
       
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );


const departementSlice = createSlice({
    name: 'departement',
    initialState: {
      departements: [],
      loading: false,
      departementErrors: null,
     
     departement: {},
    
    },
  

    extraReducers: {
      [postNewDepartement.pending]: (state) => {
        state.loading = true;
      },
      [postNewDepartement.fulfilled]: (state, action) => {
       
        state.loading = false;
        state.departement = action.payload;
        state.departementErrors = null;
      },
      [postNewDepartement.rejected]: (state, action) => {
        state.departementErrors  = action.payload;  
        state.loading = false;
        
      },
      
      [getDepartement.pending]:state=>{
        state.loading =true;
      },
      [getDepartement.fulfilled]:(state,action)=>{
      state.loading=false;
      state.departements=action.payload;
      state.errors=null;
      
      
      },
      
      [getDepartement.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },

      [updateDepartement.pending]:state=>{
        state.loading =true;
      },
      [updateDepartement.fulfilled]:(state,action)=>{
      state.loading=false;
      state.departement=action.payload;
      state.errors=null;
      
      
      },
      [updateDepartement.rejected]:(state,action)=>{
      state.loading=false;
      state.departementErrors=action.payload;
      },


      
      [deleteDepartement.pending]:state=>{
        state.loading =true;
      },
      [deleteDepartement.fulfilled]:(state,action)=>{
      state.loading=false;
      state.departement=action.payload;
      state.errors=null;
      
      
      },
      [deleteDepartement.rejected]:(state,action)=>{
      state.loading=false;
      state.departementErrors=action.payload;
      },
      



           
      

     
    },
  });
  
  export default departementSlice.reducer;