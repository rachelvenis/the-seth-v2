const express = require('express');

const router = express.Router();

const ActionsController = require('../controllers/actions-controller');
const actionsController = new ActionsController();

router.get('/validateDO', (req, res) => {
  actionsController.validateDO(res);
});

router.post('/distributeOD', (req, res) => {
  console.log("before calling distrubtue");
  actionsController.distributeOD(req, res);
});

module.exports = router;
