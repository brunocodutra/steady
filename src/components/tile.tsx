import * as classes from 'classnames';
import * as React from 'react';

type Props = {
  readonly active?: boolean,
  readonly activate?: () => void,
  readonly children: JSX.Element,
};

export default class extends React.PureComponent< Props, {} > {
  public render() {
    const active = this.props.active;
    const interactive = (!active && !!this.props.activate);
    const activate = (e: {stopPropagation: () => void}) => {
      if (this.props.activate) {
        e.stopPropagation();
        this.props.activate();
      }
    };

    return (
      <span
        className={classes('tile', {active, interactive})}
        onMouseDown={(e) => activate(e)}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && activate(e)}
        tabIndex={interactive ? 0 : -1}
      >
        {this.props.children}
      </span>
    );
  }
}
