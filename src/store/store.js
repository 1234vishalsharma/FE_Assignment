
import { configureStore } from '@reduxjs/toolkit'
import WidgetReducer from './reducers/categoryReducer.jsx';

export const store = configureStore({
  reducer: {
    widgetDashboard: WidgetReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      ignoredPaths: ['_persist']
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
