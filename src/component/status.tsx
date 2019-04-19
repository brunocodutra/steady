import classes from 'classnames';
import React from 'react';

import { Phasor } from 'lib/phasor';
import { Unit } from 'lib/unit';

import Interactive from 'component/interactive';
import Quantity from 'component/quantity';

const V = require('icon/v.svg');
const I = require('icon/i.svg');

type Props = {
  readonly value: Phasor,
  readonly unit: Unit.volt | Unit.ampere,
};

type State = {
  show: boolean,
};

const Icon = ({ unit }: Pick<Props, 'unit'>) => {
  switch (unit) {
    case Unit.volt:
      return <V />;

    case Unit.ampere:
      return <I />;
  }
};

export default class extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  public render() {
    const { show } = this.state;

    return (
      <>
        <Interactive
          action={() => null}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={classes('status control fade', this.props.unit)}
        >
          <Icon unit={this.props.unit} />
        </Interactive>
        <span className={classes('status tooltip fade', { show })}>
          <span className='arrow' />
          <span className='tooltip-inner'>
            <Quantity value={this.props.value} unit={this.props.unit} />
          </span>
        </span>
      </>
    );
  }

  private onFocus = () => {
    this.setState({ show: true });
  }

  private onBlur = () => {
    this.setState({ show: false });
  }
}
