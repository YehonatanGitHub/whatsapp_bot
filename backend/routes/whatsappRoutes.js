const express = require('express');
const router = express.Router();
const {
  sendMessage,
  setGroup,
  sendMessageToGroup,
  test,
  allGroupsData,
  allGroupsInfo,
} = require('../controllers/whatsappController');

const { protect } = require('../middleware/authMiddleware');

router.route('/send-message').post(sendMessage);
router.route('/set-group').post(setGroup);
router.route('/test').get(test);
router.route('/all-groups-data').get(allGroupsData);
router.route('/all-groups-info').get(allGroupsInfo);
router.route('/send-message-group').get(sendMessageToGroup);

module.exports = router;
