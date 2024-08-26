import React from 'react'
import AddWidget from './addWidget';
import Card from './Card';

const WidgetBoard = (props) => {
    const widgets = props.widgets;
    const category = props.category;
  return (
    <div>
      <h3 className='font-semibold'>{category}</h3>
        <div className='p-2 flex gap-4 flex-wrap justify-start'>
            {
                Array.isArray(widgets) && widgets.map((item) => {
                    return <Card cid={props.cid} wid={item.wid} title = {item.wname} text={item.text}/>
                })
            }
            <AddWidget cid={props.cid} size = {widgets.length}/>
        </div>
    </div>
  )
}

export default WidgetBoard;
