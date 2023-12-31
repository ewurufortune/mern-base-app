import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import counterReducer from './features/counter/counterSlice'
import Counter from "features/counter/Counter";
const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, authReducer,counterReducer);
const store = configureStore({
  reducer:persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
// persistor.purge().then(() => {
//   console.log('Persisted state has been cleared.');
// });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
        {/* <Counter /> */}
        {/* <GameLogic/> */}
      </PersistGate>
    </Provider>
  
);