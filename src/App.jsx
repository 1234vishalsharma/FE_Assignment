import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
