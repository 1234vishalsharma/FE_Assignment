import gsap from 'gsap';
import React, { useEffect , useRef, useState } from 'react';
import WidgetList from './WidgetList';

const WidgetContainer = ({isVisible, onClose }) => {
    const widgetRef = useRef(null);
    const [removeData , setRemoveData] = useState(false);
    useEffect(() => {
      if (isVisible) {
        gsap.to(widgetRef.current, { x: 0, duration: 0.5, ease: "power2.out" });
      } else {
        gsap.to(widgetRef.current, { x: "100%", duration: 0.5, ease: "power2.in" });
      }
    }, [isVisible]);

    return (
      <div
        ref={widgetRef}
        className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-lg transform translate-x-full z-50">
        <div className="flex justify-between items-center mb-4 p-4 text-white bg-blue-700">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>
        <span className='p-4'>Personalise Your dashboard by adding the following widget</span><br/>
        <div className="space-y-4">

          {/* Place the widgets from category array */}
        
          <div className='space-y-4 p-4'>
           <WidgetList/>
          </div>
        </div>
      </div>
    );
}

export default WidgetContainer
