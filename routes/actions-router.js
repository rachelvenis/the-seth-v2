const express = require('express');

const router = express.Router();

const ActionsController = require('../controllers/actions-controller');
const actionsController = new ActionsController();

router.post('/validateDO', (req, res) => {
  actionsController.validateDO(req, res);
});

router.post('/distributeOD', (req, res) => {
  actionsController.distributeOD(req, res);
});

router.get('/generatePDF', (req, res) => {
	// console.log('hey dude');
  actionsController.generatePDF(res);
});

module.exports = router;
