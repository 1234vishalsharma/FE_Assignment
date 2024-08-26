
import { configureStore } from '@reduxjs/toolkit'
import WidgetReducer from './reducers/categoryReducer.jsx';
export default configureStore({
  reducer: {
    categoryReducer: WidgetReducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})
