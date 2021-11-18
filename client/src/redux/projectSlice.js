import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postNewProject = createAsyncThunk(
  "project/postNewproject",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "projects/addproject",
        info,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(info);
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

export const afficheProject = createAsyncThunk(
  "project/afficheProject",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "projects/listProjects",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

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

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `projects/updateProject/${info.id}`,
        info.data,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(afficheProject());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateStateProject = createAsyncThunk(
  "project/updateStateProject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `projects/updateStateProject/${id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(afficheProject());
      return res.data;
    
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



export const updateProgreeProject = createAsyncThunk(
  "project/updateProgreeProject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `projects/updateProgressProject/${id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(afficheProject());
      return res.data;
    
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);





export const finishProject = createAsyncThunk(
  "project/finishProject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `projects/finishProject/${id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(afficheProject());
      return res.data;
    
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(
        `projects/deleteProject/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(afficheProject());
      return res.data;
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getprojectbyid = createAsyncThunk(
  "project/getprojectbyid",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `projects/listProjectsbyid/${info}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

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

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    projectbyid: [],
    loading: false,
    projectErrors: null,
    projectsErrors: null,
    project: {},
    successMessage:null,
  },
  extraReducers: {
    [postNewProject.pending]: (state) => {
      state.loading = true;
    },
    [postNewProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.successMessage= action.payload.message;
    },
    [postNewProject.rejected]: (state, action) => {
      state.projectErrors = action.payload.message;
      state.loading = false;
    },

    [afficheProject.pending]: (state) => {
      state.loading = true;
    },
    [afficheProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.errors = null;
    },
    [afficheProject.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    [updateProject.pending]: (state) => {
      state.loading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.successMessage= action.payload.message;
    },
    [updateProject.rejected]: (state, action) => {
      state.loading = false;
      state.projectErrors = action.payload.message;
    },

    [updateStateProject.pending]: (state) => {
      state.loading = true;
    },
    [updateStateProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.successMessage= action.payload.message;
    },
    [updateStateProject.rejected]: (state, action) => {
      state.loading = false;
      state.projectErrors = action.payload.message;
    },

    [finishProject.pending]: (state) => {
      state.loading = true;
    },
    [finishProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.successMessage= action.payload.message;
    },
    [finishProject.rejected]: (state, action) => {
      state.loading = false;
      state.projectErrors = action.payload.message;
    },

    [deleteProject.pending]: (state) => {
      state.loading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.successMessage= action.payload.message;
    },
    [deleteProject.rejected]: (state, action) => {
      state.loading = false;
      state.projectErrors = action.payload.message;
    },
    [getprojectbyid.pending]: (state) => {
      state.loading = true;
    },
    [getprojectbyid.fulfilled]: (state, action) => {
      state.loading = false;
      state.projectbyid = action.payload;
      state.projectErrors = null;
    },
    [getprojectbyid.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },

    [updateProgreeProject.pending]: (state) => {
      state.loading = true;
    },
    [updateProgreeProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.successMessage= action.payload.message;
    },
    [updateProgreeProject.rejected]: (state, action) => {
      state.loading = false;
      state.projectErrors = action.payload;
    },

  },
});

export default projectSlice.reducer;
