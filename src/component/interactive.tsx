import classes from 'classnames';
import React from 'react';

import { adapt, isolate } from 'lib/event';

type Props = {
  readonly action?: () => void,
  readonly onFocus?: () => void,
  readonly onBlur?: () => void,
  readonly className?: string,
  readonly children?: React.ReactNode,
};

export default ({ action, onFocus, onBlur, className = '', children }: Props) => (
  <span
    className={classes(className, { interactive: !!action })}
    onMouseDown={action && isolate(action)}
    onKeyDown={action && adapt([' ', 'Enter'], isolate(action))}
    onFocus={action && onFocus}
    onBlur={action && onBlur}
    onMouseEnter={action && onFocus}
    onMouseLeave={action && onBlur}
    tabIndex={action ? 0 : -1}
  >
    {children}
  </span>
);
