export const apiService = {
  processData: jest.fn().mockResolvedValue({ success: true }),
  getData: jest.fn().mockResolvedValue({ data: [] })
};