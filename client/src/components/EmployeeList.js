import React, { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import EmployeeForm from './EmployeeForm';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const EmployeeList = () => {
  const { employees, deleteEmployee } = useEmployees();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h1 className="display-4">Employee Manager</h1>
      </div>
      
      <button className="btn btn-primary mb-3" onClick={() => {
        setEditing(null);
        setIsNewEmployee(true);
        setShowForm(true);
      }}>Add Employee</button>

      {/* Modal */}
      <div className={`modal fade ${showForm ? 'show' : ''}`} style={{display: showForm ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editing ? 'Edit Employee' : 'Add Employee'}</h5>
              <button type="button" className="btn-close" onClick={() => {
                setShowForm(false);
                setIsNewEmployee(false);
                setEditing(null);
              }}></button>
            </div>
            <div className="modal-body">
              <EmployeeForm onClose={() => {
                setShowForm(false);
                setIsNewEmployee(false);
                setEditing(null);
              }} existing={editing} isNewEmployee={isNewEmployee} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Backdrop */}
      {showForm && <div className="modal-backdrop fade show" onClick={() => {
        setShowForm(false);
        setIsNewEmployee(false);
        setEditing(null);
      }}></div>}
      
      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showDeleteConfirm ? 'show' : ''}`} style={{display: showDeleteConfirm ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" onClick={() => {
                setShowDeleteConfirm(false);
                setEmployeeToDelete(null);
              }}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{employeeToDelete?.name}</strong>?</p>
              <p className="text-muted small">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => {
                setShowDeleteConfirm(false);
                setEmployeeToDelete(null);
              }}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={() => {
                deleteEmployee(employeeToDelete._id);
                setShowDeleteConfirm(false);
                setEmployeeToDelete(null);
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Modal Backdrop */}
      {showDeleteConfirm && <div className="modal-backdrop fade show" onClick={() => {
        setShowDeleteConfirm(false);
        setEmployeeToDelete(null);
      }}></div>}

      <div className="row row-cols-1 row-cols-md-4 g-3">
        {employees.map(emp => (
          <div key={emp._id} className="col">
            <div className="card h-100" style={{maxWidth: '280px'}}>
              {emp.photo && <img src={`${BACKEND_URL}/uploads/${emp.photo}`} className="card-img-top" style={{height: '200px', objectFit: 'contain'}} alt="photo" />}
              <div className="card-body d-flex flex-column p-3">
                <h6 className="card-title text-center fw-bold mb-2">{emp.name}</h6>
                <p className="card-text small mb-1">{emp.email && `Email: ${emp.email}`}</p>
                <p className="card-text small mb-1">{emp.age && `Age: ${emp.age}`}</p>
                <p className="card-text small mb-1">{emp.dob && `DOB: ${emp.dob}`}</p>
                <p className="card-text small mb-2">{emp.address && `Address: ${emp.address}`}</p>
                <div className="mt-auto">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => {
                    setEditing(emp);
                    setIsNewEmployee(false);
                    setShowForm(true);
                  }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => {
                    setEmployeeToDelete(emp);
                    setShowDeleteConfirm(true);
                  }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
