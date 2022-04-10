import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { adapt, isolate } from 'lib/event';

describe('Event adapt', () => {
  it('should bind an event to keyboard keys', () => {
    const handler = jest.fn();
    const onKeyDown = adapt(['Enter', ' '], handler);
    const { getByRole } = render(<span role='target' onKeyDown={onKeyDown} />);

    fireEvent.keyDown(getByRole('target'), { key: ' ' });
    fireEvent.keyDown(getByRole('target'), { key: 'a' });
    fireEvent.keyDown(getByRole('target'), { key: 'Esc' });
    fireEvent.keyDown(getByRole('target'), { key: 'Enter' });

    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe('Event isolate', () => {
  it('should stop event propagation', () => {
    const handler = jest.fn();
    const onClick = isolate(handler);
    const { getByRole } = render((
      <span role='parent' onClick={onClick}>
        <span role='child' onClick={onClick} />
      </span>
    ));

    fireEvent.click(getByRole('child'));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
