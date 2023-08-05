export default {
    type: 'module',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};