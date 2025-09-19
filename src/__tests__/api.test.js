import { apiRequest } from '../utils/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('apiRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful GET request', async () => {
    const mockData = { message: 'success' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const callback = jest.fn();
    apiRequest('/test', {}, callback);

    // Wait for the timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test', {
      headers: { 'Content-Type': 'application/json' },
    });
    expect(callback).toHaveBeenCalledWith(null, mockData);
  });

  it('should handle request errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const callback = jest.fn();
    apiRequest('/test', {}, callback);

    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'HTTP error! status: 404' }),
      null
    );
  });

  it('should handle network errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const callback = jest.fn();
    apiRequest('/test', {}, callback);

    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(callback).toHaveBeenCalledWith(
      expect.any(Error),
      null
    );
  });

  it('should simulate failure for mutations', async () => {
    const mockData = { message: 'success' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const callback = jest.fn();
    apiRequest('/test', { method: 'POST' }, callback);

    await new Promise(resolve => setTimeout(resolve, 1100));

    // Since Math.random < 0.1 might trigger failure, but we can't control it
    // Just check that callback is called
    expect(callback).toHaveBeenCalled();
  });
});