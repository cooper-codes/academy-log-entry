
import '@testing-library/jest-dom';
import { expect, beforeAll, afterAll } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);

beforeAll(() => {
  // Set up any global test configuration
});

afterAll(() => {
  cleanup();
});