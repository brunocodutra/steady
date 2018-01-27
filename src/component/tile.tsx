import * as classes from 'classnames';
import * as React from 'react';

import {adapt, isolate} from 'lib/event';

const Remove = ({event}: {event?: () => void}) => !event ? null : (
  <span
    className='control remove'
    onMouseDown={isolate(event)}
    onKeyDown={event && adapt([' ', 'Enter'], isolate(event))}
    tabIndex={0}
  />
);

type Props = {
  readonly active?: boolean,
  readonly activate?: () => void,
  readonly remove?: () => void,
  readonly className?: string,
  readonly children?: React.ReactNode,
};

export default ({active = false, activate, remove, className = '', children}: Props) => {
  if (active) {
    activate = undefined;
  }

  const interactive = !!activate;

  return (
    <span
      className={classes('tile', className, {active, interactive})}
      onMouseDown={activate && isolate(activate)}
      onKeyDown={activate && adapt([' ', 'Enter'], isolate(activate))}
      tabIndex={interactive ? 0 : -1}
    >
      <Remove event={remove}/>
      {children}
    </span>
  );
};
