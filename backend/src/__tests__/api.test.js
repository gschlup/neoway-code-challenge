const Document = require('../models/Document');
const DocumentController = require('../controllers/DocumentController');

jest.useFakeTimers();

describe('DocumentController', () => {
  let mockFind, mockSave, mockFindByIdAndUpdate, mockFindByIdAndDelete;

  beforeEach(() => {
    mockFind = jest.fn();
    mockSave = jest.fn();
    mockFindByIdAndUpdate = jest.fn();
    mockFindByIdAndDelete = jest.fn();
    mockFindOne = jest.fn();

    Document.find = mockFind;
    Document.findOne = mockFindOne;
    Document.prototype.save = mockSave;
    Document.findByIdAndUpdate = mockFindByIdAndUpdate;
    Document.findByIdAndDelete = mockFindByIdAndDelete;
  });

  describe('getAll', () => {
    it('should return all items when no filters provided', async () => {
      const mockItems = [{ type: 'CPF', number: '123' }];
      mockFind.mockResolvedValue(mockItems);

      const req = { query: {} };
      const res = { json: jest.fn() };

      await DocumentController.getAll(req, res);
      expect(mockFind).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should filter by type and isBlocked when provided', async () => {
      mockFind.mockResolvedValue([]);
      
      const req = { query: { type: 'CPF', isBlocked: 'true' } };
      const res = { json: jest.fn() };

      await DocumentController.getAll(req, res);
      expect(mockFind).toHaveBeenCalledWith({ type: 'CPF', isBlocked: true });
    });

    it('should convert isBlocked string query to boolean', async () => {
      mockFind.mockResolvedValue([]);
      
      const req = { query: { isBlocked: 'false' } };
      const res = { json: jest.fn() };

      await DocumentController.getAll(req, res);
      expect(mockFind).toHaveBeenCalledWith({ isBlocked: false });
    });
  });

  describe('create', () => {
    it('should create valid CPF record', async () => {
      const mockItem = { type: 'CPF', number: '52998224725' };
      mockFindOne.mockResolvedValue(null);
      mockSave.mockResolvedValue(mockItem);

      const req = { body: mockItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should reject invalid CPF', async () => {
      const req = { body: { type: 'CPF', number: '12345678900' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CPF' });
    });

    it('should create valid CNPJ record', async () => {
      const mockItem = { type: 'CNPJ', number: '11444777000161' };
      mockFindOne.mockResolvedValue(null);
      mockSave.mockResolvedValue(mockItem);

      const req = { body: mockItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should reject invalid CNPJ', async () => {
      const req = { body: { type: 'CNPJ', number: '11444777000100' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CNPJ' });
    });

    it('should handle missing required fields', async () => {
      const req = { body: { type: 'CPF' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CPF' });
    });

    it('should handle database errors during creation', async () => {
      const mockItem = { type: 'CPF', number: '52998224725' };
      mockSave.mockRejectedValue(new Error('Database error'));

      const req = { body: mockItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.create(req, res);

      jest.advanceTimersByTime(30000);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateBlockStatus', () => {
    it('should update block status', async () => {
      const mockItem = { id: '123', isBlocked: true };
      mockFindByIdAndUpdate.mockResolvedValue(mockItem);

      const req = { params: { id: '123' }, body: { isBlocked: true } };
      const res = { json: jest.fn() };

      await DocumentController.updateBlockStatus(req, res);
      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith('123', { isBlocked: true }, { new: true });
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 if record not found', async () => {
      mockFindByIdAndUpdate.mockResolvedValue(null);

      const req = { params: { id: '123' }, body: { isBlocked: true } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.updateBlockStatus(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Record not found' });
    });

    it('should handle invalid block status value', async () => {
      const req = { params: { id: '123' }, body: { isBlocked: 'invalid' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.updateBlockStatus(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Record not found' });
    });

    it('should handle database errors during update', async () => {
      mockFindByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: '123' }, body: { isBlocked: true } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.updateBlockStatus(req, res);

      jest.advanceTimersByTime(30000);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('delete', () => {
    it('should delete record', async () => {
      const mockItem = { id: '123' };
      mockFindByIdAndDelete.mockResolvedValue(mockItem);

      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };

      await DocumentController.delete(req, res);
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 if record not found', async () => {
      mockFindByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await DocumentController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Record not found' });
    });
  });
});
