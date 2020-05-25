const express = require('express');

const router = express.Router();

const StaffController = require('../controllers/staff-controller');
const staffController = new StaffController();

router.get('/', (req, res) => {
  staffController.findAll(res);
});

router.get('/:id', (req, res) => {
  staffController.findById(req, res);
});

router.post('/', (req, res) => {
  staffController.create(req, res);
});

router.put('/:id', (req, res) => {
  staffController.update(req, res);
});

router.delete('/:id', (req, res) => {
  staffController.delete(req, res);
});

module.exports = router;
