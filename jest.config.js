// jest.config.js or jest.config.ts
export const preset = 'ts-jest'
export const testEnvironment = 'jest-environment-jsdom'
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts']
export const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy', //Handle import of css files
}
