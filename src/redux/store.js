// import{configureStore} from '@reduxjs/toolkit'
// import cartslice from './slicer/cart_slice';
// const store =configureStore({
//     reducer:{
// cart:cartslice,
//     }
// })
// export default store ;



import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from './slicer/persistCart';

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

