import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import redisClient from '../services/redisClient';
import { invokeClaude } from '../services/bedrock';

const router = express.Router();

router.post('/ask', authenticateToken, async (req: Request, res: Response) => {
    const { prompt } = req.body as { prompt: string };
    const cacheKey = `claude:${prompt.trim()}`;

    try {
        const cachedResponse = await redisClient.get(cacheKey);
        if (cachedResponse) {
            console.log('Cache hit');
            return res.json({ answer: cachedResponse });
        }

        const answer = await invokeClaude(prompt);

        await redisClient.setEx(cacheKey, 86400, answer);

        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error invoking Claude or accessing cache' });
    }
});

export default router;
