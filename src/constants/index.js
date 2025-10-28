// API Constants
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Storage Keys
export const STORAGE_KEYS = {
  WIDGET_STATE: 'widget-dashboard-state',
  USER_PREFERENCES: 'user-preferences'
};

// Widget Types
export const WIDGET_TYPES = {
  CHART: 'chart',
  METRIC: 'metric',
  TABLE: 'table',
  TEXT: 'text'
};

// Category Types
export const CATEGORY_TYPES = {
  DASHBOARD: 'dashboard',
  EXECUTIVE: 'executive',
  TECHNICAL: 'technical'
};

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  MAX_SEARCH_RESULTS: 10,
  WIDGET_MIN_HEIGHT: 200,
  WIDGET_MIN_WIDTH: 300
};

// Error Messages
export const ERROR_MESSAGES = {
  WIDGET_ADD_FAILED: 'Failed to add widget. Please try again.',
  WIDGET_REMOVE_FAILED: 'Failed to remove widget. Please try again.',
  SEARCH_FAILED: 'Search failed. Please try again.',
  LOAD_FAILED: 'Failed to load data. Please refresh the page.',
  SAVE_FAILED: 'Failed to save changes. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  WIDGET_ADDED: 'Widget added successfully',
  WIDGET_REMOVED: 'Widget removed successfully',
  CHANGES_SAVED: 'Changes saved successfully'
};

