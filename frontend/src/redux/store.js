import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux'; // Add this import

import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import tokenReducer from './features/user/tokenSlide';
import purchaseReducer from './features/product/purchaseSlice';
import productReducer from './features/product/productSlice';
import orderReducer from './features/user/OrderSlide';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'token', 'purchase', 'product', 'order'], // reducers to persist
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  cart: cartReducer,
  purchase: purchaseReducer,
  product: productReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
