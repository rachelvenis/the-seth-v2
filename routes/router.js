const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} [${req.method}] : ${JSON.stringify(req.body)}`);
  
  next();
});

router.use('/staff', require('./staff-router'));
router.use('/days', require('./days-router'));
router.use('/assignments', require('./assignments-router'));
router.use('/actions', require('./actions-router'));

module.exports = router;
