import React, { useEffect, useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeForm = ({ existing, onClose, isNewEmployee }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    dob: '',
    address: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});

  // Reset form function
  const resetForm = () => {
    setForm({
      name: '',
      age: '',
      email: '',
      dob: '',
      address: '',
      photo: null,
    });
    setErrors({});
  };

  useEffect(() => {
    if (existing) {
      const formattedExisting = { ...existing };
      if (existing.dob) {
        if (typeof existing.dob === 'string' && existing.dob.includes('-')) {
          formattedExisting.dob = existing.dob;
        } else if (existing.dob instanceof Date) {
          // Convert Date object to YYYY-MM-DD string
          const yyyy = existing.dob.getFullYear();
          const mm = String(existing.dob.getMonth() + 1).padStart(2, '0');
          const dd = String(existing.dob.getDate()).padStart(2, '0');
          formattedExisting.dob = `${yyyy}-${mm}-${dd}`;
        }
      }
      // Ensure all fields are properly set, including empty ones
      setForm({
        name: formattedExisting.name || '',
        age: formattedExisting.age || '',
        email: formattedExisting.email || '',
        dob: formattedExisting.dob || '',
        address: formattedExisting.address || '',
        photo: null, // Always reset photo to null for editing
      });
      setErrors({});
    } else {
      // Reset form for new employee or when no existing data
      resetForm();
    }
  }, [existing, isNewEmployee]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrors({});
    
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!form.name.match(/^[A-Za-z\s]+$/)) {
      newErrors.name = 'Name must contain only letters and spaces';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (form.age && (isNaN(form.age) || parseInt(form.age) <= 0 || parseInt(form.age) > 150)) {
      newErrors.age = 'Age must be a positive number between 1 and 150';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'photo') {
        // Only append photo if it's a file
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (key === 'dob' && value) {
        formData.append('dob', value);
      } else if (key === 'age') {
        // Always send age, even if empty, to allow clearing
        formData.append('age', value || '');
      } else if (key === 'address') {
        // Always send address, even if empty, to allow clearing
        formData.append('address', value || '');
      } else if (value) {
        formData.append(key, value);
      }
    });

    try {
      if (existing) {
        await updateEmployee(existing._id, formData);
      } else {
        await addEmployee(formData);
      }
      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes('duplicate') || errorMessage.includes('unique')) {
          setErrors({ email: 'Email already exists, try a different email' });
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    }
  };

    return (
    <form onSubmit={handleSubmit}>
      {errors.general && (
        <div className="alert alert-danger mb-3" role="alert">
          {errors.general}
        </div>
      )}
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input 
            name="name" 
            className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
            placeholder="Enter name" 
            value={form.name} 
            onChange={handleChange} 
          />
          {errors.name && <div className="invalid-feedback text-danger">{errors.name}</div>}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input 
            name="age" 
            type="number"
            min="1"
            max="150"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`} 
            placeholder="Enter age" 
            value={form.age} 
            onChange={handleChange} 
          />
          {errors.age && <div className="invalid-feedback text-danger">{errors.age}</div>}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input 
            name="email" 
            className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
            placeholder="Enter email" 
            value={form.email} 
            onChange={handleChange} 
          />
          {errors.email && <div className="invalid-feedback text-danger">{errors.email}</div>}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" name="dob" className="form-control" value={form.dob?.substring(0,10)} onChange={handleChange} />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea name="address" className="form-control" placeholder="Enter address" value={form.address} onChange={handleChange} rows="2"></textarea>
        </div>
        
        <div className="mb-4">
          <label className="form-label">Photo</label>
          <input type="file" name="photo" className="form-control" onChange={handleChange} accept="image/*" />
        </div>
        
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-success" type="submit">Save</button>
        </div>
      </form>
  );
};

export default EmployeeForm;
