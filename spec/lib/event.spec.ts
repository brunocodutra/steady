import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import {adapt, isolate} from 'lib/event';

Enzyme.configure({adapter: new Adapter()});

describe('Event adapt', () => {
  it('should bind an event to keyboard keys', () => {
    const handler = jest.fn();
    const onKeyDown = adapt(['Enter', ' '], handler);
    const node = Enzyme.mount(React.createElement('span', {onKeyDown}));

    node.simulate('keyDown', {key: ' '});
    node.simulate('keyDown', {key: 'a'});
    node.simulate('keyDown', {key: 'Esc'});
    node.simulate('keyDown', {key: 'Enter'});

    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe('Event isolate', () => {
  it('should stop event propagation', () => {
    const handler = jest.fn();
    const stopPropagation = jest.fn();
    const onClick = isolate(handler);
    const node = Enzyme.mount(React.createElement('span', {onClick}));

    node.simulate('click', {stopPropagation});

    expect(handler).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });
});
