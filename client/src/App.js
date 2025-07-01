import React from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <EmployeeProvider>
      <div className="container mt-4">
        <EmployeeList />
      </div>
    </EmployeeProvider>
  );
}

export default App;
