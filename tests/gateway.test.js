const request = require('supertest');
const app = require('../src/server'); // Import the app we just wrote

describe('API Center Gateway Tests', () => {

    // Test 1: Health Check
    it('GET /health should return 200 OK', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('API Center is Online');
    });

    // Test 2: Verify Gateway is listening (Basic sanity check)
    it('should have the routing middleware configured', () => {
        expect(app._router.stack.some(layer => layer.regexp.test('/tribe1'))).toBe(true);
    });
});