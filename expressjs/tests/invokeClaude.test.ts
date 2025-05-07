import { invokeClaude } from '../services/bedrock';

// Mock the Bedrock client
jest.mock('../services/bedrock', () => {
    return {
        ...jest.requireActual('../services/bedrock'),
        invokeClaude: jest.fn().mockResolvedValue('Test response')
    };
});

describe('invokeClaude', () => {
    it('should return a mock response', async () => {
        const answer = await invokeClaude('Hello');
        expect(answer).toBe('Test response');
    });
});
