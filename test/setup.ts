import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

const originalSetTimeout = window.setTimeout;
window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]) => {
    const safeTimeout = Number.isFinite(timeout) ? timeout : 0;
    return originalSetTimeout(handler, safeTimeout, ...args);
}) as typeof window.setTimeout;

// Disable transitions in tests to avoid JSDOM transition warnings.
vi.mock('react-transition-group/Transition', async () => {
    const { forwardRef } = await import('react');
    const MockTransition = forwardRef(({ children, in: inProp }: any, ref) => {
        if (typeof children === 'function') {
            return children(inProp ? 'entered' : 'exited', { ref });
        }
        return children ?? null;
    });
    return { __esModule: true, default: MockTransition };
});

vi.mock('react-transition-group/CSSTransition', async () => {
    const { forwardRef } = await import('react');
    const MockCSSTransition = forwardRef(({ children, in: inProp }: any, ref) => {
        if (typeof children === 'function') {
            return children(inProp ? 'entered' : 'exited', { ref });
        }
        return children ?? null;
    });
    return { __esModule: true, default: MockCSSTransition };
});

vi.mock('dom-helpers/transitionEnd', () => {
    const noOp = () => () => {};
    return { __esModule: true, default: noOp };
});

vi.mock('dom-helpers/cjs/transitionEnd', () => {
    const noOp = () => () => {};
    return { __esModule: true, default: noOp };
});

vi.mock('dom-helpers/cjs/transitionEnd.js', () => {
    const noOp = () => () => {};
    return { __esModule: true, default: noOp };
});

vi.mock('react-transition-group/cjs/Transition.js', async () => {
    const { forwardRef } = await import('react');
    const MockTransition = forwardRef(({ children, in: inProp }: any, ref) => {
        if (typeof children === 'function') {
            return children(inProp ? 'entered' : 'exited', { ref });
        }
        return children ?? null;
    });
    return { __esModule: true, default: MockTransition };
});
