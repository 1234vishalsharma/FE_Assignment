import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/reducers/categoryReducer';

const Card = memo(({ cid, wid, title, text }) => {
  const dispatch = useDispatch();
  
  const handleRemove = useCallback(() => {
    dispatch(removeWidget({ cid, wid }));
  }, [dispatch, cid, wid]);

  return (
    <div className='flex flex-col gap-4 p-4 h-72 w-[400px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-100'>
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
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
