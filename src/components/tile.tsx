import * as React from 'react';

type Props = {
  readonly active?: boolean,
  readonly onClick?: () => void,
  readonly children: JSX.Element,
};

export default class extends React.Component< Props, {} > {
  public render() {
    const active = !!this.props.active ? 'blink' : '';
    const interactive = !!this.props.onClick ? 'interactive' : '';

    return (
      <span
        className={`tile ${active} ${interactive}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </span>
    );
  }
}
