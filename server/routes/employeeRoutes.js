const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// REST Endpoints
router.get('/', employeeController.getEmployees);
router.post('/', upload.single('photo'), employeeController.addEmployee);
router.put('/:id', upload.single('photo'), employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
