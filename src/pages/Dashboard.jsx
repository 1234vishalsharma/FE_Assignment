import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WidgetBoard from '../components/WidgetBoard';
import WidgetContainer from '../components/widgetContainer';

const Dashboard = () => {
  const handelRefresh = () => {
    window.location.reload();
  }

  const [isWidgetVisible, setWidgetVisible] = useState(false);
  const categories = useSelector((state) => state.categoryReducer.categories);

  return (
    <div className="h-full w-full relative top-12 pt-4 bg-blue-50">
      <div className='flex justify-between items-center p-4'>
        <h3 className='font-bold'>CNAPP Dashboard</h3>
        <div className='flex gap-4 max-md:hidden'>
          <Button onClick={() => setWidgetVisible(true)} variant={'outlined'} size={"small"} >Add Widget +</Button>
          <Button onClick={handelRefresh} variant={'outlined'} size={"small"} ><img src="./refresh.svg" alt="..." /></Button>
          <Button variant={'outlined'} size={"small"} ><img src="./option.svg" alt="..." /></Button>
          <Button variant={'outlined'} size={"small"} ><img src="./clock.svg" alt="..." /> <span className='ml-1'> | Last 2 days</span></Button>
        </div>
        <div className='flex gap-4 md:hidden'>
          <Button variant={'outlined'} size={"small"} ><img src="./option.svg" alt="..." /></Button>
        </div>
      </div>

      <div className='h-full w-full pl-8'>
        {
          Array.isArray(categories) && categories.map(element => {
            return (<div className='w-full h-76'>
              <WidgetBoard cid = {element.id} category={element.name} widgets={element.widgets}/>
            </div>)
          })
        }
      </div>

      <WidgetContainer setVisible={setWidgetVisible} isVisible={isWidgetVisible} onClose={() => setWidgetVisible(false)}/>
    </div>
  )
}

export default Dashboard
