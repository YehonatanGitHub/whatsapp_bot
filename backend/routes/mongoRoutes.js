const express = require('express');
const router = express.Router();
const { statsAllMsgs } = require('../controllers/mongoController');

const { protect } = require('../middleware/authMiddleware');

router.route('/stats-all-msgs').get(statsAllMsgs);

module.exports = router;
