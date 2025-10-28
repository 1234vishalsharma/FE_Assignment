import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMultipleWidgets } from "../store/reducers/categoryReducer";

const WidgetList = ({onClose}) => {
  const categories = useSelector((state) => state.widgetDashboard.categories);
  const dispatch = useDispatch();
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const [activeTab, setActiveTab] = useState(0);

  // Initialize all widgets as selected when categories change
  useEffect(() => {
    const allWidgets = new Set();
    categories.forEach(category => {
      category.widgets.forEach(widget => {
        allWidgets.add(`${category.id}-${widget.wid}`);
      });
    });
    setSelectedWidgets(allWidgets);
  }, [categories]);

  const isWidgetSelected = useCallback((cid, wid) => {
    return selectedWidgets.has(`${cid}-${wid}`);
  }, [selectedWidgets]);

  const handleWidgetToggle = useCallback((isChecked, wid, cid) => {
    const widgetKey = `${cid}-${wid}`;
    setSelectedWidgets(prev => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(widgetKey);
      } else {
        newSet.delete(widgetKey);
      }
      return newSet;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    // Get all widgets that are NOT selected (unchecked)
    const allWidgets = new Set();
    categories.forEach(category => {
      category.widgets.forEach(widget => {
        allWidgets.add(`${category.id}-${widget.wid}`);
      });
    });

    const uncheckedWidgets = Array.from(allWidgets)
      .filter(widgetKey => !selectedWidgets.has(widgetKey))
      .map(widgetKey => {
        const [cid, wid] = widgetKey.split('-');
        return { cid: parseInt(cid), wid: parseInt(wid) };
      });

    if (uncheckedWidgets.length > 0) {
      dispatch(removeMultipleWidgets({ widgets: uncheckedWidgets }));
    }
    
    // Reset selection to all remaining widgets
    setSelectedWidgets(new Set());
  }, [selectedWidgets, dispatch, categories]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  const handleSelectAll = useCallback(() => {
    const allWidgets = new Set();
    categories.forEach(category => {
      category.widgets.forEach(widget => {
        allWidgets.add(`${category.id}-${widget.wid}`);
      });
    });
    setSelectedWidgets(allWidgets);
  }, [categories]);

  const handleDeselectAll = useCallback(() => {
    setSelectedWidgets(new Set());
  }, []);

  const handleTabChange = useCallback((tabIndex) => {
    setActiveTab(tabIndex);
  }, []);

  const totalWidgets = categories.reduce((total, cat) => total + cat.widgets.length, 0);
  const uncheckedCount = totalWidgets - selectedWidgets.size;
  const activeCategory = memoizedCategories[activeTab];

  return (
    <div className="flex flex-col h-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 mb-4">
        {memoizedCategories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === index
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {category.widgets.length}
            </span>
          </button>
        ))}
      </div>


      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeCategory && (
          <div className="space-y-2">
            {activeCategory.widgets.map((element) => (
              <div 
                key={`${activeCategory.id}-${element.wid}`} 
                className="m-2 flex gap-3 border border-gray-300 p-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    checked={isWidgetSelected(activeCategory.id, element.wid)}
                    onChange={(event) =>
                      handleWidgetToggle(event.target.checked, element.wid, activeCategory.id)
                    }
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3 flex-1">
                    <span className="text-gray-800 font-medium select-none">{element.wname}</span>
                    <p className="text-sm text-gray-500 mt-1">{element.text}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-transparent text-black rounded border-2 border-black rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={uncheckedCount === 0}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default WidgetList;
