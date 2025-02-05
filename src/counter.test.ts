import { describe, it, expect, beforeEach } from 'vitest';
import { setupCounter } from './counter';

describe('setupCounter', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    // Create a fresh button element before each test
    button = document.createElement('button');
    setupCounter(button);
  });

  it('should initialize counter with 0', () => {
    expect(button.innerHTML).toBe('count is 0');
  });

  it('should increment counter when clicked', () => {
    button.click();
    expect(button.innerHTML).toBe('count is 1');

    button.click();
    expect(button.innerHTML).toBe('count is 2');
  });
}); 