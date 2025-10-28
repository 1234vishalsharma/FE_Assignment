import { Button } from '@mui/material';
import React, { useState, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import WidgetBoard from '../components/WidgetBoard';
import WidgetContainer from '../components/WidgetContainer';
import { selectCategories, selectTotalWidgets } from '../store/reducers/categoryReducer';

const Dashboard = memo(() => {
  const [isWidgetVisible, setWidgetVisible] = useState(false);
  const categories = useSelector(selectCategories);
  const totalWidgets = useSelector(selectTotalWidgets);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleAddWidget = useCallback(() => {
    setWidgetVisible(true);
  }, []);

  const handleCloseWidget = useCallback(() => {
    setWidgetVisible(false);
  }, []);

  return (
    <div className="min-h-screen w-full relative top-12 pt-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className='flex justify-between items-center p-4'>
        <div>
          <h3 className='font-bold text-2xl text-gray-800'>CNAPP Dashboard</h3>
          <p className='text-sm text-gray-600 mt-1'>Total Widgets: {totalWidgets}</p>
        </div>
        <div className='flex gap-4 max-md:hidden'>
          <Button 
            onClick={handleAddWidget} 
            variant='outlined' 
            size="small"
            className='hover:bg-blue-50'
          >
            Add Widget +
          </Button>
          <Button 
            onClick={handleRefresh} 
            variant='outlined' 
            size="small"
            className='hover:bg-gray-50'
            title="Refresh Dashboard"
          >
            <img src="./refresh.svg" alt="Refresh" className="w-4 h-4" />
          </Button>
          <Button 
            variant='outlined' 
            size="small"
            className='hover:bg-gray-50'
            title="Options"
          >
            <img src="./option.svg" alt="Options" className="w-4 h-4" />
          </Button>
          <Button 
            variant='outlined' 
            size="small"
            className='hover:bg-gray-50'
            title="Time Range"
          >
            <img src="./clock.svg" alt="Time" className="w-4 h-4" />
            <span className='ml-1'>Last 2 days</span>
          </Button>
        </div>
        <div className='flex gap-4 md:hidden'>
          <Button 
            variant='outlined' 
            size="small"
            className='hover:bg-gray-50'
          >
            <img src="./option.svg" alt="Options" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className='h-full w-full p-8'>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map(element => (
            <WidgetBoard 
              key={element.id} 
              cid={element.id} 
              category={element.name} 
              widgets={element.widgets}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Categories Found</h3>
              <p className="text-gray-500">Add some widgets to get started</p>
            </div>
          </div>
        )}
      </div>

      <WidgetContainer 
        isVisible={isWidgetVisible} 
        onClose={handleCloseWidget}
      />
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
