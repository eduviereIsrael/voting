import { configureStore } from '@reduxjs/toolkit'
import   { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer'

import logger from 'redux-logger';


// const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
//   Boolean
// );

const middleWares = []

const rootPersistConfig = {
  key: 'oga-landlord-root',
  storage: storage,
  // blacklist: ['user']
}


const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) => 
//       getDefaultMiddleware({
//         serializableCheck: false
//       }).concat(middleWares)
//   })
// }

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleWares)
})

export const persistor = persistStore(store)