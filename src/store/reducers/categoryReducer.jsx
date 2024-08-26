import { createSlice } from '@reduxjs/toolkit'

// function to save the updated categories to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('categories', serializedState);
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

// load the categories from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('categories');
    if (serializedState === null) {
      return undefined; // Return undefined if no state is saved
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};

const persistedState = loadStateFromLocalStorage();

export const categoryReducer = createSlice({
  name: 'WidgetReducer',
  initialState: {
    categories : persistedState || [
      {
          'id': 1,
          'name': "CSPM Executive Dashboard",
          'widgets' : [{
              'wid' : 1,
              'wname'  : 'CSPM Widget 1',
              'text' : 'Some Random Text of widget 1'
          } , {
              'wid' : 2,
              'wname'  : 'CSPM Widget 2',
              'text' : 'Some Random Text of widget 2'
          }]
      },
      {
          'id': 2,
          'name': "CWPP Dashboard",
          'widgets' : [{
              'wid' : 1,
              'wname'  : 'CWPP Widget 1',
              'text' : 'Some Random Text'
          },{
            'wid' : 2,
            'wname'  : 'CWPP Widget 2',
            'text' : 'Some Random Text of widget 2'
        }]
      },{
        'id' : 3,
        'name' : 'Registry Scan',
        'widgets' : [{
          'wid': 1,
          'wname':'Image Risk Assisment',
          'text' : '1470 Total Vulneribalities'
        }]
      }
  ]
  },
  reducers: {
    addWidget : (state , action) => {
        const {cid , wid , title , text} = action.payload;
        const widget = {wid , wname: title , text};
        
        const category = state.categories.find((cat_id)=> cat_id.id === cid);
        if(category){
          category.widgets.push(widget);
          saveStateToLocalStorage(state.categories);
        }
    },

    removeWidget : (state ,action) => {
      const {cid , wid} = action.payload;
      
      const category = state.categories.find((cat_id)=> cat_id.id === cid);
      console.log("fnding category");
      if(category){
        console.log("start filtering")
        category.widgets = category.widgets.filter((wid_id)=>wid_id.wid !== wid);
      }

      // save to localStorage
      saveStateToLocalStorage(state.categories);

    }
  }
})


export const { addWidget , removeWidget } = categoryReducer.actions

export default categoryReducer.reducer