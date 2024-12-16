const CpfCnpj = require('../models/CpfCnpj');
const { cpf, cnpj } = require('cpf-cnpj-validator');

exports.getAll = async (req, res) => {
  const { type, isBlocked } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (isBlocked) filter.isBlocked = isBlocked === 'true';

  const items = await CpfCnpj.find(filter);
  res.json(items);
};

exports.create = async (req, res) => {
  const { type, number } = req.body;

  if (type === 'CPF' && !cpf.isValid(number)) {
    return res.status(400).json({ error: 'Invalid CPF' });
  }

  if (type === 'CNPJ' && !cnpj.isValid(number)) {
    return res.status(400).json({ error: 'Invalid CNPJ' });
  }

  const item = new CpfCnpj({ type, number });
  await item.save();
  res.status(201).json(item);
};

exports.updateBlockStatus = async (req, res) => {
  const { id } = req.params;
  const { isBlocked } = req.body;

  const item = await CpfCnpj.findByIdAndUpdate(
    id,
    { isBlocked },
    { new: true }
  );

  if (!item) return res.status(404).json({ error: 'Record not found' });
  res.json(item);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const item = await CpfCnpj.findByIdAndDelete(id);

  if (!item) return res.status(404).json({ error: 'Record not found' });
  res.json(item);
};