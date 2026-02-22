import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('framer-motion', async () => {
  const React = await import('react');
  const createElementWithoutMotionProps = (tag, ref, props, children) => {
    const {
      animate,
      transition,
      initial,
      exit,
      whileTap,
      whileHover,
      ...domProps
    } = props;
    return React.createElement(tag, { ref, ...domProps }, children);
  };

  return {
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    motion: {
      button: React.forwardRef(({ children, ...props }, ref) =>
        createElementWithoutMotionProps('button', ref, props, children)
      ),
      div: React.forwardRef(({ children, ...props }, ref) =>
        createElementWithoutMotionProps('div', ref, props, children)
      ),
    },
  };
});

test('renders player title', () => {
  global.fetch = vi.fn(() => new Promise(() => {}));

  render(<App />);
  const titleElement = screen.getByText(/vinyl loop/i);
  expect(titleElement).toBeDefined();
});
