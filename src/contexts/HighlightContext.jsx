import React, { createContext, useContext, useState, useRef } from 'react';

const HighlightContext = createContext();

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
};

export const HighlightProvider = ({ children }) => {
  const [highlightedWidget, setHighlightedWidget] = useState(null);
  const widgetRefs = useRef(new Map());

  const highlightWidget = (widgetKey) => {
    setHighlightedWidget(widgetKey);
    
    // Scroll to the highlighted widget
    setTimeout(() => {
      const widgetElement = widgetRefs.current.get(widgetKey);
      if (widgetElement) {
        widgetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }, 100); // Small delay to ensure the widget is rendered
    
    // Auto-remove highlight after 3 seconds
    setTimeout(() => {
      setHighlightedWidget(null);
    }, 3000);
  };

  const clearHighlight = () => {
    setHighlightedWidget(null);
  };

  const isHighlighted = (widgetKey) => {
    return highlightedWidget === widgetKey;
  };

  const registerWidgetRef = (widgetKey, element) => {
    if (element) {
      widgetRefs.current.set(widgetKey, element);
    } else {
      widgetRefs.current.delete(widgetKey);
    }
  };

  return (
    <HighlightContext.Provider 
      value={{ 
        highlightedWidget, 
        highlightWidget, 
        clearHighlight, 
        isHighlighted,
        registerWidgetRef
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};
