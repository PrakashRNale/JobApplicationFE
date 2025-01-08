import logo from './logo.svg';
import './App.css';
import EmailForm from './components/NewJobApplication/NewJobApplication';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import JobApplication from './components/JobApplication/JobApplication';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <Header />
      <JobApplication />
      <Footer />
    </div>
  );
}

export default App;
