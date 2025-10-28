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
        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-lg transform translate-x-full z-50 flex flex-col">
        <div className="flex justify-between items-center p-4 text-white bg-blue-700 flex-shrink-0">
          <h2 className="text-lg font-semibold">Add Widgets</h2>
          <button onClick={onClose} className="text-xl font-bold hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
            &times;
          </button>
        </div>
        <div className="p-4 text-sm text-gray-600 flex-shrink-0">
          Personalize your dashboard by adding the following widget
        </div>
        <div className="flex-1 overflow-hidden px-4 pb-4">
          <WidgetList onClose={onClose}/>
        </div>
      </div>
    );
}

export default WidgetContainer
