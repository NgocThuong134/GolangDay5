// src/App.js
import React from 'react';
import StudentList from './components/ListStudent';
import "./App.css";

const App = () => {
 
  return (
    <div>
      <h1>Student Management</h1>
      <StudentList  />
    </div>
  );
};

export default App;