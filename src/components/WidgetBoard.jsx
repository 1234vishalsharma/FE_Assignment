import React, { memo, useMemo } from 'react'
import AddWidget from './AddWidget';
import Card from './Card';

const WidgetBoard = memo(({ cid, category, widgets }) => {
  const memoizedWidgets = useMemo(() => widgets, [widgets]);
  
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-xl mb-4 text-gray-800">{category}</h3>
      <div className="p-2 flex gap-4 flex-wrap justify-start">
        {Array.isArray(memoizedWidgets) && memoizedWidgets.map((item) => (
          <Card 
            key={item.wid} 
            cid={cid} 
            wid={item.wid} 
            title={item.wname} 
            text={item.text}
          />
        ))}
        <AddWidget cid={cid} size={memoizedWidgets.length} />
      </div>
    </div>
  );
});

WidgetBoard.displayName = 'WidgetBoard';

export default WidgetBoard;
