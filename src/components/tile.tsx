import * as React from 'react';

type Props = {
  readonly active?: boolean,
  readonly interactive?: boolean,
  readonly children: JSX.Element,
};

export default class extends React.Component< Props, {} > {
  public render() {
    const active = !!this.props.active ? 'blink' : '';
    const interactive = !!this.props.interactive ? 'interactive' : '';

    return (
      <span className={`tile ${active} ${interactive}`}>
        {this.props.children}
      </span>
    );
  }
}
