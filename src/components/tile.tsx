import * as classes from 'classnames';
import * as React from 'react';

type Props = {
  readonly active?: boolean,
  readonly onClick?: () => void,
  readonly children: JSX.Element,
};

export default class extends React.Component< Props, {} > {
  public render() {
    const active = this.props.active;
    const interactive = (!active && !!this.props.onClick);

    return (
      <span
        className={classes('tile', {active, interactive})}
        onMouseDown={this.props.onClick}
        onKeyDown={({key}) => (key === ' ' || key === 'Enter') && this.props.onClick && this.props.onClick()}
        tabIndex={interactive ? 0 : -1}
      >
        {this.props.children}
      </span>
    );
  }
}
