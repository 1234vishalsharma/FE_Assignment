import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addWidget, 
  removeWidget, 
  removeMultipleWidgets,
  selectCategories,
  selectTotalWidgets,
  selectLoading,
  selectError 
} from '../store/reducers/categoryReducer';

export const useWidgets = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const totalWidgets = useSelector(selectTotalWidgets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const addNewWidget = useCallback((categoryId, title, text) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    
    const newWidgetId = Math.max(...category.widgets.map(w => w.wid), 0) + 1;
    dispatch(addWidget({ 
      cid: categoryId, 
      wid: newWidgetId, 
      title, 
      text 
    }));
  }, [dispatch, categories]);

  const removeSingleWidget = useCallback((categoryId, widgetId) => {
    dispatch(removeWidget({ cid: categoryId, wid: widgetId }));
  }, [dispatch]);

  const removeWidgets = useCallback((widgetsToRemove) => {
    dispatch(removeMultipleWidgets({ widgets: widgetsToRemove }));
  }, [dispatch]);

  const getWidgetsByCategory = useCallback((categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.widgets : [];
  }, [categories]);

  const searchWidgets = useCallback((searchTerm) => {
    if (!searchTerm.trim()) return [];
    
    return categories.flatMap(category => 
      category.widgets
        .filter(widget => 
          widget.wname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(widget => ({
          ...widget,
          categoryName: category.name,
          categoryId: category.id
        }))
    );
  }, [categories]);

  return {
    categories,
    totalWidgets,
    loading,
    error,
    addNewWidget,
    removeSingleWidget,
    removeWidgets,
    getWidgetsByCategory,
    searchWidgets
  };
};

