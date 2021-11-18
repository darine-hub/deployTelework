import {createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
/********************************************************* */
export const updateMessages = createAsyncThunk(
  'message/updateMessage',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/chat/updateStatueMessage/${info.user1}/${info.user2}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
     
      dispatch(getallmessages(info.userId))
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
/********************************************************* */
export const updateChatmessage = createAsyncThunk(
  'message/updateChatmessage',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/chat/updateStatueChatroom/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getallchatmessages(info.chatId))
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
/********************************************************* */
export const updateMembers = createAsyncThunk(
  'message/updateMembers',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/chat/updateMembers/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getAllChatrooms(info.userId))
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
/********************************************************* */
export const updateChatName = createAsyncThunk(
  'message/updateChatName',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/chat/updateRoomName/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getAllChatrooms(info.userId))
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

/****************************************************** */
export const deleteChat = createAsyncThunk(
  "message/deleteChat",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(
        `/chat/deleteChatroom/${info.data}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      dispatch(getAllChatrooms(info.userId));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addMessage= createAsyncThunk(
  'messages/addMessage',
  async (info, { rejectWithValue, dispatch }) => {
    console.log('info here',info);
    try {
      const res = await axios.post('/chat/addmessage', info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      console.log(info)
     dispatch(getmessages({"user1":info.data.sender,"user2":info.data.receiver}))
     dispatch(getallmessages(info.userId))
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
/********************************************************** */
export const addchatMessage= createAsyncThunk(
  'Chatmessages/addchatMessage',
  async (info, { rejectWithValue, dispatch }) => {
    console.log('info here',info);
    try {
      const res = await axios.post('/chat/addchatmessage', info, {
        headers: { token: localStorage.getItem('token') },
      });
     dispatch(getchatmessages(info.Room))
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
/******************************************************** */
export const addChatroom= createAsyncThunk(
  'chatRooms/addChatRoom',
  async (info, { rejectWithValue, dispatch }) => {
    console.log('info here',info);
    try {
      const res = await axios.post('/chat/addRoom', info, {
        headers: { token: localStorage.getItem('token') },
      });
      const id=JSON.parse(localStorage.getItem('user'))
      console.log(id)
      dispatch(getAllChatrooms(id._id.toString()))
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

/******************************************************* */
export const getAllChatrooms = createAsyncThunk(
  "chatRooms/getAllChatroom", async (userId, thunkAPI) => {
     try {
        const response = await axios.get(`/chat/getAllChatrooms/${userId}`,{
          headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
/******************************************************* */
export const getmessages = createAsyncThunk(
  "messages/getmessages", async (Info, thunkAPI) => {
     try {
       console.log(Info)
        const response = await axios.get(`/chat/getmessages/${Info.user1}/${Info.user2}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
/******************************************************* */
export const getallmessages = createAsyncThunk(
  "allmessages/getallmessages", async (Info, thunkAPI) => {
     try {
       console.log(Info)
        const response = await axios.get(`/chat/getallmessages/${Info}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
/****************************************************************** */
export const getchatmessages = createAsyncThunk(
  "Chatmessages/getchatmessages", async (Info, thunkAPI) => {
     try {
        const response = await axios.get(`/chat/getRoomChat/${Info}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
export const getallchatmessages = createAsyncThunk(
  "Allchatmessages/getallchatmessages", async (Info, thunkAPI) => {
     try {
        const response = await axios.get(`/chat/getallRoomChat/${Info}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
      messages: [],
      ChatRooms:[],
      allmessages:[],
      Chatmessages:[],
      Allchatmessages:[],
      sender:null,
      currentChat:null,
    loading: false,
    messageErrors: null,
    messagesErrors: null,
    ChatRoomsErrors:null,
    allmessagesErrors:null,
    ChatmessagesErrors:null,
    senderErrors:null,
    currentChatErrors:null,
    


    
  },
  reducers:{
    clicksender:(state,action)=>{
      state.sender=action.payload
  },
  updateMessage:(state,action)=>{
    state.messages=[...state.messages,action.payload]
},
updateChat:(state,action)=>{
  state.Chatmessages=[...state.Chatmessages,action.payload]},
clickedRoom:(state,action)=>{
  state.currentChat=action.payload
}},
  extraReducers: {
    [addMessage.pending]: (state) => {
      state.loading = true;
    },
    [addMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.messageErrors = null;
    },
    [addMessage.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    
    [getAllChatrooms.pending]: (state) => {
      state.loading = true;
    },
    [getAllChatrooms.fulfilled]: (state, action) => {
      state.loading = false;
      state.ChatRooms = action.payload;
      state.ChatRoomsErrors = null;
    },
    [getAllChatrooms.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [addChatroom.pending]: (state) => {
      state.loading = true;
    },
    [addChatroom.fulfilled]: (state, action) => {
      state.loading = false;
      state.ChatRoomsErrors = null;
    },
    [addChatroom.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getmessages.pending]: (state) => {
      state.loading = true;
    },
    [getmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
      state.messagesErrors = null;
    },
    [getmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getallmessages.pending]: (state) => {
      state.loading = true;
    },
    [getallmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.allmessages = action.payload;
      state.allmessagesErrors = null;
    },
    [getallmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [addchatMessage.pending]: (state) => {
      state.loading = true;
    },
    [addchatMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [addchatMessage.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getchatmessages.pending]: (state) => {
      state.loading = true;
    },
    [getchatmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.Chatmessages = action.payload;
      state.ChatmessagesErrors = null;
    },
    [getchatmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getallchatmessages.pending]: (state) => {
      state.loading = true;
    },
    [getallchatmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.Allchatmessages = action.payload;
      state.ChatmessagesErrors = null;
    },
    [getallchatmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [deleteChat.pending]: (state) => {
      state.loading = true;
    },
    [deleteChat.fulfilled]: (state) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [deleteChat.rejected]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = action.payload;
    },
    [updateChatName.pending]: (state) => {
      state.loading = true;
    },
    [updateChatName.fulfilled]: (state) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [updateChatName.rejected]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = action.payload;
    },
    [updateMembers.pending]: (state) => {
      state.loading = true;
    },
    [updateMembers.fulfilled]: (state) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [updateMembers.rejected]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = action.payload;
    },
    [updateMessages.pending]: (state) => {
      state.loading = true;
    },
    [updateMessages.fulfilled]: (state) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [updateMessages.rejected]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = action.payload;
    },
    [updateChatmessage.pending]: (state) => {
      state.loading = true;
    },
    [updateChatmessage.fulfilled]: (state) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [updateChatmessage.rejected]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = action.payload;
    },
    
  }, 
});

export const {clicksender , updateChat,updateMessage ,clickedRoom} = messageSlice.actions
export default messageSlice.reducer;