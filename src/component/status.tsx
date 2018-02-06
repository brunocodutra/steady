import * as classes from 'classnames';
import * as React from 'react';

import {adapt, isolate} from 'lib/event';
import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

import Quantity from 'component/quantity';

const v = (
  <svg viewBox='0 0 192 1126'>
    <path fill='currentColor' d='M27.901209 173.13417L58.559943 22.049669 161.03235 137.22734z'/>
    <path d='M102.18194 1103.9503c82.72549-326.22932 82.38594-614.92907 0-948.73199'/>
  </svg>
);

const i = (
  <svg viewBox='0 0 505 185'>
    <path
      fill='currentColor'
      d='M342.00006 162.49999l139.9999-69.999982-139.9999-70zM23.000041 92.500008l319.000019-.5618'
    />
  </svg>
);

type Props = {
  readonly value: Phasor,
  readonly unit: Unit.volt | Unit.ampere,
};

type State = {
  show: boolean,
};

const Icon = ({unit}: Pick<Props, 'unit'>) => {
  switch (unit) {
    case Unit.volt:
      return v;

    case Unit.ampere:
      return i;
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
    const {show} = this.state;

    return (
      <>
        <span
          onMouseDown={() => null}
          onKeyDown={adapt([' ', 'Enter'], () => null)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseEnter={this.onFocus}
          onMouseLeave={this.onBlur}
          className={classes('control status fade', this.props.unit)}
          tabIndex={0}
        >
          <Icon unit={this.props.unit}/>
        </span>
        <span onMouseDown={isolate(() => null)} className={classes('status tooltip fade', {show})}>
          <span className='arrow'/>
          <span className='tooltip-inner'>
            <Quantity value={this.props.value} unit={this.props.unit}/>
          </span>
        </span>
      </>
    );
  }

  private onFocus = () => {
    this.setState({show: true});
  }

  private onBlur = () => {
    this.setState({show: false});
  }
}
