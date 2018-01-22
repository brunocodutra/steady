import * as classes from 'classnames';
import * as React from 'react';

const lift = (f?: () => void) => f && (
  (_: React.SyntheticEvent<HTMLElement>) => f()
);

const isolate = (f?: (_: React.SyntheticEvent<HTMLElement>) => void) => f && (
  (e: React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    f(e);
  }
);

const adapt = (f?: (_: React.SyntheticEvent<HTMLElement>) => void) => f && (
  (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      f(e);
    }
  }
);

const Remove = ({event}: {event?: () => void}) => !event ? null : (
  <span
    className='control remove'
    onMouseDown={isolate(lift(event))}
    onKeyDown={adapt(isolate(lift(event)))}
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
      onMouseDown={isolate(lift(activate))}
      onKeyDown={adapt(isolate(lift(activate)))}
      tabIndex={interactive ? 0 : -1}
    >
      <Remove event={remove}/>
      {children}
    </span>
  );
};
