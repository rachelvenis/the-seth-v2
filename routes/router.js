const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} [${req.method}] : ${JSON.stringify(req.body)}`);
  
  next();
});

router.use('/staff', require('./staff-router'));
// router.use('/tabs', require('./tabs-router'));
// router.use('/tabsuser', require('./tabs-user-router'));

module.exports = router;
