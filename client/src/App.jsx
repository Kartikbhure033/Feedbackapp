import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from '/src/components/Form';
import Feedback from '/src/components/Feedback';
import FeedbackPage from '/src/components/FeedbackPage';
import Login from '/src/components/Login';
import Hero from './components/Hero';

const App = () => {
  return (
    <Routes>
      
      <Route path='/students' element={<Form />} />
      <Route path='/login' element={<Login />} />
      <Route path='/feedback' element={<Feedback />} />
      <Route path='/admin/feedbacks' element={<FeedbackPage />} />
      {/* <Route path='/' element={<div className="p-8"><h1>Home</h1></div>} /> */}
      <Route path='/' element={<Hero/>}/>
    </Routes>
  );
}

export default App;
