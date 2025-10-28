import React, { useState, memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCategories } from '../store/reducers/categoryReducer';

const SearchBox = memo(() => {
  const [search, setSearchText] = useState("");
  const categories = useSelector(selectCategories);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    
    return categories.flatMap(category => 
      category.widgets
        .filter(widget => 
          widget.wname.toLowerCase().includes(search.toLowerCase()) ||
          widget.text.toLowerCase().includes(search.toLowerCase())
        )
        .map(widget => ({
          categoryName: category.name,
          widgetName: widget.wname,
          widgetText: widget.text,
          categoryId: category.id,
          widgetId: widget.wid
        }))
    );
  }, [categories, search]);

  const handleSearch = useCallback((e) => {
    if (e.key === 'Enter' && search.trim()) {
      if (searchResults.length > 0) {
        console.log('Search results:', searchResults);
        // Navigate to dashboard if not already there
        if (window.location.pathname !== '/Dashboard') {
          navigate('/Dashboard');
        }
      } else {
        alert('No results found');
      }
    }
  }, [search, searchResults, navigate]);

  return (
    <div className="flex gap-1 pl-4 items-center h-10 bg-blue-100 w-96 overflow-hidden border-2 rounded-md border-blue-200 max-md:hidden hover:border-blue-300 transition-colors">
      <img className="h-5 w-5 text-gray-500" src="./search.svg" alt="Search" />
      <input 
        value={search}
        onChange={handleChange}
        onKeyDown={handleSearch}
        type="text" 
        className="flex items-center h-full w-full bg-blue-100 outline-none border-0 text-gray-700 placeholder-gray-500" 
        placeholder="Search widgets..."
      />
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {searchResults.slice(0, 5).map((result, index) => (
            <div key={index} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
              <div className="font-medium text-sm text-gray-800">{result.widgetName}</div>
              <div className="text-xs text-gray-600">{result.categoryName}</div>
              <div className="text-xs text-gray-500 mt-1 truncate">{result.widgetText}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
