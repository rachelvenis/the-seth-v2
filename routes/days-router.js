const express = require('express');

const router = express.Router();

const DayController = require('../controllers/day-controller');
const dayController = new DayController();

router.get('/', (req, res) => {
  dayController.findAll(res);
});

router.get('/:id', (req, res) => {
  dayController.findById(req, res);
});

// router.get('/byUsername/:username', (req, res) => {
//   dayController.findByUsername(req, res);
// });

router.post('/', (req, res) => {
  dayController.create(req, res);
});

router.put('/:id', (req, res) => {
  dayController.update(req, res);
});

router.delete('/:id', (req, res) => {
  dayController.delete(req, res);
});

module.exports = router;
