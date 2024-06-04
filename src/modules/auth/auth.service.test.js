const { createUser, getUserByUsername } = require('../../repository/user.repository');
jest.mock('../../repository/user.repository');

describe('Auth Service', () => {
    
    beforeEach(() => {
        process.env = {
            JWT_SECRET: 'test',
            JWT_EXPIRES_IN: '1d',
            JWT_REFRESH_SECRET: 'test1',
            JWT_REFRESH_EXPIRES_IN: '1d'
        }
    })
    
    afterEach(() => {
        jest.clearAllMocks();
        process.env = {
            JWT_SECRET: 'test',
            JWT_EXPIRES_IN: '1d',
            JWT_REFRESH_SECRET: 'test1',
            JWT_REFRESH_EXPIRES_IN: '1d'
        }
    });
    
    it('Should create new user', async () => {
        const {signUpNewUser} = require('./auth.service');

        const mockPayload = {
            username: 'test',
            password: 'test'
        };
        createUser.mockResolvedValue({});

        const {username, refreshToken, token} = await signUpNewUser(mockPayload);

        expect(username).toBe('test');
        expect(refreshToken).toBeDefined();
        expect(token).toBeDefined();
    });

    it('Should sign in user', async () => {
        const {signInUser} = require('./auth.service');

        const mockPayload = {
            username: 'test',
            password: 'test'
        };
        getUserByUsername.mockResolvedValue({
            username: 'test',
            password: '$2b$10$SgzAFjJMcnX0Xv13K3dqFuidmrTnLwj2bQkumkxWvbrlU1OADmqsW',
            role: 'user'
        });

        const {username, refreshToken, token} = await signInUser(mockPayload);

        expect(username).toBe('test');
        expect(refreshToken).toBeDefined();
        expect(token).toBeDefined();
    });
});