const express = require('express');
const CpfCnpjController = require('../controllers/CpfCnpjController');

const router = express.Router();

const startTime = Date.now();

global._requestsCount = {
  total: 0,
  success: 0,
  error: 0
};

router.get('/cpfs-cnpjs', CpfCnpjController.getAll);
router.post('/cpfs-cnpjs', CpfCnpjController.create);
router.patch('/cpfs-cnpjs/:id/block', CpfCnpjController.updateBlockStatus);
router.delete('/cpfs-cnpjs/:id', CpfCnpjController.delete)

router.get('/status', (req, res) => {
  const uptime = Date.now() - startTime;

  // Convert uptime to a more readable format
  const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
  const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((uptime % (60 * 1000)) / 1000);

  const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  res.json({
    status: 'ok',
    uptime: formattedUptime,
    requestsCount: global._requestsCount
  });
});

module.exports = router;