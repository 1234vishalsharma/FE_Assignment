import { createSlice, createSelector } from '@reduxjs/toolkit'

// Constants
const STORAGE_KEY = 'widget-dashboard-state';
const INITIAL_STATE = {
  categories: [
    {
      id: 1,
      name: "CSPM",
      widgets: [
        {
          wid: 1,
          wname: 'CSPM Widget 1',
          text: 'Some Random Text of widget 1'
        },
        {
          wid: 2,
          wname: 'CSPM Widget 2',
          text: 'Some Random Text of widget 2'
        }
      ]
    },
    {
      id: 2,
      name: "CWPP",
      widgets: [
        {
          wid: 1,
          wname: 'CWPP Widget 1',
          text: 'Some Random Text'
        },
        {
          wid: 2,
          wname: 'CWPP Widget 2',
          text: 'Some Random Text of widget 2'
        }
      ]
    },
    {
      id: 3,
      name: 'Registry Scan',
      widgets: [
        {
          wid: 1,
          wname: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities'
        }
      ]
    }
  ],
  loading: false,
  error: null
};

// Utility functions
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn('Could not save state to localStorage:', e);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state from localStorage:', e);
    return undefined;
  }
};

const persistedState = loadStateFromLocalStorage();

export const categoryReducer = createSlice({
  name: 'widgetDashboard',
  initialState: persistedState || INITIAL_STATE,
  reducers: {
    addWidget: (state, action) => {
      const { cid, wid, title, text } = action.payload;
      const widget = { wid, wname: title, text };
      
      const category = state.categories.find(cat => cat.id === cid);
      if (category) {
        category.widgets.push(widget);
        saveStateToLocalStorage(state);
      }
    },

    removeWidget: (state, action) => {
      const { cid, wid } = action.payload;
      
      const category = state.categories.find(cat => cat.id === cid);
      if (category) {
        category.widgets = category.widgets.filter(w => w.wid !== wid);
        saveStateToLocalStorage(state);
      }
    },

    removeMultipleWidgets: (state, action) => {
      const { widgets } = action.payload;
      
      widgets.forEach(({ cid, wid }) => {
        const category = state.categories.find(cat => cat.id === cid);
        if (category) {
          category.widgets = category.widgets.filter(w => w.wid !== wid);
        }
      });
      saveStateToLocalStorage(state);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    resetState: () => INITIAL_STATE
  }
});

// Selectors for better performance
export const selectCategories = (state) => state.widgetDashboard.categories;
export const selectLoading = (state) => state.widgetDashboard.loading;
export const selectError = (state) => state.widgetDashboard.error;

export const selectCategoryById = createSelector(
  [selectCategories, (state, categoryId) => categoryId],
  (categories, categoryId) => categories.find(cat => cat.id === categoryId)
);

export const selectWidgetsByCategory = createSelector(
  [selectCategories, (state, categoryId) => categoryId],
  (categories, categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.widgets : [];
  }
);

export const selectTotalWidgets = createSelector(
  [selectCategories],
  (categories) => categories.reduce((total, cat) => total + cat.widgets.length, 0)
);

export const { 
  addWidget, 
  removeWidget, 
  removeMultipleWidgets,
  setLoading, 
  setError, 
  resetState 
} = categoryReducer.actions;

export default categoryReducer.reducer;