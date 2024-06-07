import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import axios from 'axios'; // Add this import
import { getnewTk, logout as tokenLogout } from './tokenSlide';

const userSlice = createSlice({
  name: "user_info",
  initialState: {
    login: false,
    isadmin: false,
    user: {
      _id: "",
      address: '',
      bank: null,
      birthday: null,
      gender: null,
      email: null,
      phone: null,
      name: null,
      password: null,
    },
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      console.log("thong tin dang nhap: ", action.payload);
      const { _id, address, bank, birthday, email, gender, name, phone, password } = action.payload;
      return { ...state, user: { _id, address, bank, birthday, email, gender, name, phone, password }, login: true };
    },
    updateUser: (state, action) => {
      console.log("trong ham update", action.payload);
      const { address, bank, birthday, email, gender, name, phone, password } = action.payload;
      return { ...state, user: { address, bank, birthday, email, gender, name, phone, password } };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
    setAdmin: (state) => {
      return { ...state, isadmin: true };
    },
    logOut: (state) => {
      return {
        login: false,
        isadmin: false,
        user: {
          _id: "",
          address: null,
          bank: null,
          birthday: null,
          gender: null,
          email: null,
          phone: null,
          name: null,
          password: null,
        },
        error: null
      };
    },
  }
});

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['login', 'isadmin', 'user'], // List the properties you want to persist
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUser, updateUser, setError, logOut, setAdmin } = userSlice.actions;

export function sentUser(user) {
  return async function sentUserBythunk(dispatch, getState) {
    let { address, bank, birthday, email, gender, name, phone, password, ...rest } = user;
    let temp = getState().user.user;
    let tk = getState().token;
    let newuser;

    if (email === temp.email) {
      newuser = phone === temp.phone 
        ? { address, bank, birthday, gender, name, password } 
        : { address, bank, birthday, gender, name, password, phone };
    } else {
      newuser = phone === temp.phone 
        ? { address, bank, birthday, gender, name, password, email } 
        : { address, bank, birthday, gender, name, password, phone, email };
    }

    try {
      const response = await axios.put(`/api/customers/update/${tk._id}`, newuser, {
        headers: {
          token: tk.accessTk
        }
      });
      dispatch(setError("success"));
      dispatch(updateUser(response.data.updatedCustomer));
    } catch (error) {
      try {
        const newtk = await dispatch(getnewTk());
        try {
          const response = await axios.put(`/api/customers/update/${tk._id}`, newuser, {
            headers: {
              token: newtk
            }
          });
          dispatch(updateUser(response.data.updatedCustomer));
          dispatch(setError("success"));
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
        dispatch(setError(err));
      }
    }
  };
}

export const logoutAsync = () => {
  return async (dispatch) => {
    await dispatch(tokenLogout());
    dispatch(logOut());
  };
};

export default persistedUserReducer;
