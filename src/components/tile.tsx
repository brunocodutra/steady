import * as classes from 'classnames';
import * as React from 'react';

type Props = {
  readonly active?: boolean,
  readonly activate?: () => void,
  readonly className?: string,
  readonly children?: React.ReactNode,
};

export default (props: Props) => {
  const active = props.active;
  const className = props.className || '';
  const interactive = (!active && !!props.activate);
  const activate = (e: {stopPropagation: () => void}) => {
    if (props.activate) {
      e.stopPropagation();
      props.activate();
    }
  };

  return (
    <span
      className={classes('tile', className, {active, interactive})}
      onMouseDown={(e) => activate(e)}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && activate(e)}
      tabIndex={interactive ? 0 : -1}
    >
      {props.children}
    </span>
  );
};
