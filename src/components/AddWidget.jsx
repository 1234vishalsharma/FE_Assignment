import { Button } from '@mui/material';
import React, { useState, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../store/reducers/categoryReducer';

const AddWidget = memo(({ cid, size }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCategory = useCallback(async () => {
    if (!text.trim() || !title.trim()) {
      alert("Title and text cannot be empty");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const wid = size + 1;
      const data = { cid, wid, title: title.trim(), text: text.trim() };
      dispatch(addWidget(data));
      setTitle('');
      setText('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding widget:', error);
      alert('Failed to add widget. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [cid, size, title, text, dispatch]);

  const handleCancel = useCallback(() => {
    setTitle('');
    setText('');
    setIsExpanded(false);
  }, []);

  return (
    <div className='flex flex-col gap-4 p-4 h-72 w-[400px] rounded-xl bg-white shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200'>
      <div className='w-full h-full flex justify-center items-center'>
        {!isExpanded ? (
          <Button 
            onClick={() => setIsExpanded(true)} 
            variant='outlined'
          >
            Add Widget +
          </Button>
        ) : (
          <div className='flex flex-col gap-2 w-full p-2 h-full'>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-gray-700'>Widget Title</label>
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="text"
                placeholder="Enter widget title"
                disabled={isSubmitting}
              /> 
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-gray-700'>Widget Text</label>
              <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' 
                rows={3}
                placeholder="Enter widget description"
                disabled={isSubmitting}
              /> 
            </div>
            <div className='flex gap-2'>
              <Button 
                onClick={handleAddToCategory} 
                variant='contained'
                disabled={isSubmitting || !title.trim() || !text.trim()}
                className='flex-1'
              >
                {isSubmitting ? 'Adding...' : 'Add Widget'}
              </Button>
              <Button 
                onClick={handleCancel} 
                variant='outlined'
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

AddWidget.displayName = 'AddWidget';

export default AddWidget;
