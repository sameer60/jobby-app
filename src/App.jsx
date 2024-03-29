import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Jobs from './components/Jobs/Jobs';
import Login from './components/Login/Login';
import JobItemsDetails from './components/JobItemDetails/JobItemsDetails';
import NotFound from './components/NotFound/NotFound';

function App() {

  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='jobs/:id' element={<JobItemsDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App