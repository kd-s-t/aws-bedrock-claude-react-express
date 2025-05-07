import { authenticateToken } from '../middleware/authenticateToken';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

describe('authenticateToken', () => {
    it('should return 401 if no token', () => {
        const req = { headers: {} } as Request;
        const res = { sendStatus: jest.fn() } as unknown as Response;
        const next = jest.fn();

        authenticateToken(req, res, next);
        expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should call next if valid token', () => {
        const token = jwt.sign({ userId: 1, username: 'admin' }, 'your-secret-key');
        const req = { headers: { authorization: `Bearer ${token}` } } as Request;
        const res = { sendStatus: jest.fn() } as unknown as Response;
        const next = jest.fn();

        authenticateToken(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
