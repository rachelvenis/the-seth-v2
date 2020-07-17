const express = require('express');

const router = express.Router();

const AssignmentController = require('../controllers/assignment-controller');
const assignmentController = new AssignmentController();

router.get('/', (req, res) => {
  assignmentController.findAll(res);
});

router.get('/draftDO', (req, res) => {
  assignmentController.findAllDODraft(res);
});

router.get('/draftOD', (req, res) => {
  assignmentController.findAllODDraft(res);
});

router.get('/:id', (req, res) => {
  assignmentController.findById(req, res);
});

router.post('/', (req, res) => {
  assignmentController.create(req, res);
});

router.put('/:id', (req, res) => {
  assignmentController.update(req, res);
});

router.delete('/:id', (req, res) => {
  assignmentController.delete(req, res);
});

router.post('/apply', (req, res) => {
  assignmentController.create(req, res);
});

module.exports = router;
