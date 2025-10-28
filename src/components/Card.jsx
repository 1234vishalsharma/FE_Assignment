import React, { memo, useCallback, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/reducers/categoryReducer';
import { useHighlight } from '../contexts/HighlightContext';

const Card = memo(({ cid, wid, title, text }) => {
  const dispatch = useDispatch();
  const { isHighlighted, registerWidgetRef } = useHighlight();
  const cardRef = useRef(null);
  
  const handleRemove = useCallback(() => {
    dispatch(removeWidget({ cid, wid }));
  }, [dispatch, cid, wid]);

  const widgetKey = `${cid}-${wid}`;
  const isHighlightedWidget = isHighlighted(widgetKey);

  // Register the widget ref for scrolling
  useEffect(() => {
    registerWidgetRef(widgetKey, cardRef.current);
    return () => {
      registerWidgetRef(widgetKey, null);
    };
  }, [widgetKey, registerWidgetRef]);

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col gap-4 p-4 h-72 w-[400px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 relative ${
        isHighlightedWidget 
          ? 'border-yellow-400 shadow-yellow-200 shadow-lg ring-2 ring-yellow-200' 
          : 'border-gray-100'
      }`}
    >
      <div className='flex justify-between items-start'>
        <h3 className='font-semibold text-lg text-gray-800 flex-1 pr-2'>{title}</h3>
        <button 
          onClick={handleRemove} 
          className="text-xl font-bold h-8 w-8 flex items-center justify-center hover:bg-red-100 hover:text-red-600 rounded-full transition-colors duration-200 flex-shrink-0"
          aria-label={`Remove ${title} widget`}
        >
          &times;
        </button>
      </div>
      <div className='flex-1 flex items-center justify-center bg-gray-50 rounded-lg'>
        <img 
          className='h-24 w-full object-contain' 
          src="./graph.svg" 
          alt="Widget visualization" 
        />
      </div>
      <p className='text-center text-gray-600 text-sm leading-relaxed'>{text}</p>
      {isHighlightedWidget && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
