import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/pages/Profile';
import List from './components/pages/List';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/list' element={<List />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;