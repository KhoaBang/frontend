import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import axios from 'axios';


const tokenSlice = createSlice({
  name: 'token_info',
  initialState: {
    accessTk: 0,
    refreshTk: null,
    _id: null
  },
  reducers: {
    setToken: (state, action) => {
      const { accessToken, refreshToken, existingCustomer } = action.payload;
      return {
        ...state,
        accessTk: accessToken,
        _id: existingCustomer._id,
        refreshTk: refreshToken
      };
    },
    updaterefreshTk: (state, action) => {
      return {
        ...state,
        accessTk: action.payload
      };
    },
    // Other reducers...
    logout:(state)=>{return{
      accessTk: 0,
      refreshTk: null,
      _id: null
    }}
  },
});

export function getnewTk (){
  return async function getnewTkbyThunk(dispatch,getState){
    console.log(getState().token.refreshTk)
    try{
      const response = await axios.post(
        '/api/customers/refreshtoken',
        {},
        {
          headers: {
            token: await getState().token.refreshTk
          }
        }
      );
      console.log(response)
      dispatch(updaterefreshTk(response.data.access_token))
      return response.data.access_token
    }catch(error){
      console.log(error)
    }
  }};

export const { setToken,updaterefreshTk,selectAccessToken,logout } = tokenSlice.actions;
 export const selectAccToken = ()=> {return async function Acc (dispatch,getState){const a= await getState().token.refreshTk
  return a
 }};

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['accessTk', 'refreshTk', '_id'], // List the properties you want to persist
};


const persistedTokenReducer = persistReducer(persistConfig, tokenSlice.reducer);


export default persistedTokenReducer;
