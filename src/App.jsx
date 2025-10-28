import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import { HighlightProvider } from './contexts/HighlightContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <ErrorBoundary>
      <HighlightProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Dashboard' element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </HighlightProvider>
    </ErrorBoundary>
  );
}

export default App;
