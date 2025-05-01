// src/App.js
import React from 'react';
import StudentAttendanceList from './components/StudentAttendanceList';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <h1>Student Attendance Tracker</h1>
      <StudentAttendanceList />
    </div>
  );
}

export default App;

