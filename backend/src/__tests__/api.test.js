const CpfCnpj = require('../models/CpfCnpj');
const CpfCnpjController = require('../controllers/CpfCnpjController');

describe('CpfCnpjController', () => {
  let mockFind, mockSave, mockFindByIdAndUpdate, mockFindByIdAndDelete;

  beforeEach(() => {
    mockFind = jest.fn();
    mockSave = jest.fn();
    mockFindByIdAndUpdate = jest.fn();
    mockFindByIdAndDelete = jest.fn();

    CpfCnpj.find = mockFind;
    CpfCnpj.prototype.save = mockSave;
    CpfCnpj.findByIdAndUpdate = mockFindByIdAndUpdate;
    CpfCnpj.findByIdAndDelete = mockFindByIdAndDelete;
  });

  describe('getAll', () => {
    it('should return all items when no filters provided', async () => {
      const mockItems = [{ type: 'CPF', number: '123' }];
      mockFind.mockResolvedValue(mockItems);

      const req = { query: {} };
      const res = { json: jest.fn() };

      await CpfCnpjController.getAll(req, res);
      expect(mockFind).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should filter by type and isBlocked when provided', async () => {
      mockFind.mockResolvedValue([]);
      
      const req = { query: { type: 'CPF', isBlocked: 'true' } };
      const res = { json: jest.fn() };

      await CpfCnpjController.getAll(req, res);
      expect(mockFind).toHaveBeenCalledWith({ type: 'CPF', isBlocked: true });
    });
  });

  describe('create', () => {
    it('should create valid CPF record', async () => {
      const mockItem = { type: 'CPF', number: '529.982.247-25' };
      mockSave.mockResolvedValue(mockItem);

      const req = { body: mockItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await CpfCnpjController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should reject invalid CPF', async () => {
      const req = { body: { type: 'CPF', number: '123.456.789-00' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await CpfCnpjController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CPF' });
    });
  });

  describe('updateBlockStatus', () => {
    it('should update block status', async () => {
      const mockItem = { id: '123', isBlocked: true };
      mockFindByIdAndUpdate.mockResolvedValue(mockItem);

      const req = { params: { id: '123' }, body: { isBlocked: true } };
      const res = { json: jest.fn() };

      await CpfCnpjController.updateBlockStatus(req, res);
      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith('123', { isBlocked: true }, { new: true });
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 if record not found', async () => {
      mockFindByIdAndUpdate.mockResolvedValue(null);

      const req = { params: { id: '123' }, body: { isBlocked: true } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await CpfCnpjController.updateBlockStatus(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Record not found' });
    });
  });

  describe('delete', () => {
    it('should delete record', async () => {
      const mockItem = { id: '123' };
      mockFindByIdAndDelete.mockResolvedValue(mockItem);

      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };

      await CpfCnpjController.delete(req, res);
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 if record not found', async () => {
      mockFindByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await CpfCnpjController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Record not found' });
    });
  });
});
