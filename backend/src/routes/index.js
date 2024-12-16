const express = require('express');
const CpfCnpjController = require('../controllers/CpfCnpjController');

const router = express.Router();

router.get('/cpfs-cnpjs', CpfCnpjController.getAll);
router.post('/cpfs-cnpjs', CpfCnpjController.create);
router.patch('/cpfs-cnpjs/:id/block', CpfCnpjController.updateBlockStatus);
router.delete('/cpfs-cnpjs/:id', CpfCnpjController.delete)

module.exports = router;