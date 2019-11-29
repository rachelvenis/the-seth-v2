const express = require('express');

const router = express.Router();

const ValidationController = require('../controllers/validation-controller');
const validationController = new ValidationController();

router.get('/', (req, res) => {
  validationController.findAll(res);
});

// router.get('/:id', (req, res) => {
//   validationController.findById(req, res);
// });

// // router.get('/byUsername/:username', (req, res) => {
// //   validationController.findByUsername(req, res);
// // });

// router.post('/', (req, res) => {
//   validationController.create(req, res);
// });

// router.put('/:id', (req, res) => {
//   validationController.update(req, res);
// });

// router.delete('/:id', (req, res) => {
//   validationController.delete(req, res);
// });

module.exports = router;
