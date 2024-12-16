const express = require('express');
const CpfCnpjController = require('../controllers/CpfCnpjController');
const StatusController = require('../controllers/StatusController');

const router = express.Router();

global._requestsCount = {
  total: 0,
  success: 0,
  error: 0
};

router.get('/cpfs-cnpjs', CpfCnpjController.getAll);
router.post('/cpfs-cnpjs', CpfCnpjController.create);
router.patch('/cpfs-cnpjs/:id/block', CpfCnpjController.updateBlockStatus);
router.delete('/cpfs-cnpjs/:id', CpfCnpjController.delete)
router.get('/status', StatusController.getStatus);

module.exports = router;