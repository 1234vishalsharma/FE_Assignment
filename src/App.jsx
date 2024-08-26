import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import LocomotiveScroll from 'locomotive-scroll';


function App() {
  
  const locomotiveScroll = new LocomotiveScroll();
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/Dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
