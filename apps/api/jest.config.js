module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: [
        "<rootDir>/test/__fixtures__",
        "<rootDir>/node_modules",
        "<rootDir>/dist",
    ],
};