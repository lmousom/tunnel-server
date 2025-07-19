const TunnelManager = require('../utils/tunnel-manager');

describe('TunnelManager', () => {
  let tunnelManager;

  beforeEach(() => {
    tunnelManager = new TunnelManager();
  });

  describe('registerClient', () => {
    it('should register a valid client', () => {
      const mockWs = { on: jest.fn() };
      const mockReq = { socket: { remoteAddress: '127.0.0.1' } };
      
      const result = tunnelManager.registerClient('test-client', mockWs, mockReq);
      
      expect(result).toBe(true);
      expect(tunnelManager.getClient('test-client')).toBeDefined();
    });

    it('should reject invalid client IDs', () => {
      const mockWs = { on: jest.fn() };
      const mockReq = { socket: { remoteAddress: '127.0.0.1' } };
      
      const result = tunnelManager.registerClient('invalid@client', mockWs, mockReq);
      
      expect(result).toBe(false);
      expect(tunnelManager.getClient('invalid@client')).toBeUndefined();
    });

    it('should reject duplicate client IDs', () => {
      const mockWs1 = { on: jest.fn() };
      const mockWs2 = { on: jest.fn() };
      const mockReq = { socket: { remoteAddress: '127.0.0.1' } };
      
      tunnelManager.registerClient('test-client', mockWs1, mockReq);
      const result = tunnelManager.registerClient('test-client', mockWs2, mockReq);
      
      expect(result).toBe(false);
    });
  });

  describe('unregisterClient', () => {
    it('should unregister a client', () => {
      const mockWs = { on: jest.fn() };
      const mockReq = { socket: { remoteAddress: '127.0.0.1' } };
      
      tunnelManager.registerClient('test-client', mockWs, mockReq);
      expect(tunnelManager.getClient('test-client')).toBeDefined();
      
      tunnelManager.unregisterClient('test-client');
      expect(tunnelManager.getClient('test-client')).toBeUndefined();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', () => {
      const stats = tunnelManager.getStats();
      
      expect(stats).toHaveProperty('totalConnections');
      expect(stats).toHaveProperty('activeClients');
      expect(stats).toHaveProperty('pendingRequests');
      expect(stats).toHaveProperty('clients');
      
      expect(stats.totalConnections).toBe(0);
      expect(stats.activeClients).toBe(0);
      expect(stats.pendingRequests).toBe(0);
      expect(stats.clients).toEqual([]);
    });
  });
}); 
