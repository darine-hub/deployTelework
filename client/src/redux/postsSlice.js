import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addNewPost = createAsyncThunk(
  'posts/addnewpost',
  async (info, { rejectWithValue, dispatch }) => {
    
    try {
      const res =  axios.post('api/blog/createPost', info,
      
      {  headers: { token: localStorage.getItem('token') }
      });
      dispatch(getBlog())
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
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/posts/update/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePostImage = createAsyncThunk(
  'posts/updatePostImage',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('postImg', info.file);
      const res = await axios.put(`/posts/uploadimg/${info.id}`, formData, {
        headers: { token: localStorage.getItem('token') },
      });
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getBlog = createAsyncThunk(
  'posts/getBlog',
  async (_, { rejectWithValue }) => {
    try {
      
        
      const res = await axios.get(`api/blog/getBlogs` ,{
        headers: { token: localStorage.getItem('token') }
      }) 
      
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
export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async (variable, { rejectWithValue }) => {
    try {
      const res = axios.get(`api/blog/getPost/${variable}`,{
        headers: { token: localStorage.getItem('token') }})
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
      
    }
  }
);

const postSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    post:null,
    loading: false,
    postErrors: null,
    postsErrors: null,
    blog: {},
  },
  extraReducers: {
    [addNewPost.pending]: (state) => {
      state.loading = true;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.postErrors = null;
    },
    [addNewPost.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getBlog.pending]: (state) => {
      state.loading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      state.postsErrors = null;
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getSinglePost.pending]: (state) => {
      state.loading = true;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.postsErrors = null;
    },
    [getSinglePost.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  
  },
});

export default postSlice.reducer;