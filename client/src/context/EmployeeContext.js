import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  const fetchEmployees = async () => {
    const res = await axios.get(`${BACKEND_URL}/employees`);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (formData) => {
    const res = await axios.post(`${BACKEND_URL}/employees`, formData);
    setEmployees([...employees, res.data]);
  };

  const updateEmployee = async (id, formData) => {
    const res = await axios.put(`${BACKEND_URL}/employees/${id}`, formData);
    await fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${BACKEND_URL}/employees/${id}`);
    setEmployees(employees.filter(emp => emp._id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
