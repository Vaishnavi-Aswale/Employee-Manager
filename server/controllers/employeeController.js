const Employee = require('../models/Employee');

// GET /employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  
  const processedEmployees = employees.map(emp => {
    const employee = emp.toObject();
    if (employee.dob instanceof Date) {
      const yyyy = employee.dob.getFullYear();
      const mm = String(employee.dob.getMonth() + 1).padStart(2, '0');
      const dd = String(employee.dob.getDate()).padStart(2, '0');
      employee.dob = `${yyyy}-${mm}-${dd}`;
    }
    return employee;
  });
  
  res.json(processedEmployees);
};

// POST /employees
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, age, dob, address } = req.body;
    let photo = '';
    if (req.file) {
      photo = req.file.filename;
    }

    // Handle date conversion to prevent timezone issues
    let processedDob = dob;
    if (dob) {
      if (typeof dob === 'string' && dob.includes('-')) {
        processedDob = dob;
      } else if (dob instanceof Date) {
        // Convert Date object to YYYY-MM-DD string
        const yyyy = dob.getFullYear();
        const mm = String(dob.getMonth() + 1).padStart(2, '0');
        const dd = String(dob.getDate()).padStart(2, '0');
        processedDob = `${yyyy}-${mm}-${dd}`;
      }
    }

    const employee = new Employee({ name, email, age, dob: processedDob, address, photo });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /employees/:id
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, age, dob, address } = req.body;
    let photo = req.body.photo;
    if (req.file) {
      photo = req.file.filename;
    }

    // Handle date conversion to prevent timezone issues
    let processedDob = dob;
    if (dob) {
      if (typeof dob === 'string' && dob.includes('-')) {
        // Store as string directly to avoid timezone conversion
        processedDob = dob;
      } else if (dob instanceof Date) {
        // Convert Date object to YYYY-MM-DD string
        const yyyy = dob.getFullYear();
        const mm = String(dob.getMonth() + 1).padStart(2, '0');
        const dd = String(dob.getDate()).padStart(2, '0');
        processedDob = `${yyyy}-${mm}-${dd}`;
      }
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, age, dob: processedDob, address, photo },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /employees/:id
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
};
