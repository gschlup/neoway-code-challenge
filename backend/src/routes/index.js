const express = require('express');
const DocumentController = require('../controllers/DocumentController');
const StatusController = require('../controllers/StatusController');

const router = express.Router();

global._requestsCount = {
  total: 0,
  success: 0,
  error: 0
};

router.get('/document', DocumentController.getAll);
router.post('/document', DocumentController.create);
router.patch('/document/:id/block', DocumentController.updateBlockStatus);
router.delete('/document/:id', DocumentController.delete)
router.get('/status', StatusController.getStatus);

module.exports = router;