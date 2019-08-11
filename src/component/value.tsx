import classes from 'classnames';
import React from 'react';

import { angle, norm, Phasor, polar } from 'lib/phasor';
import { degrees, radians, Unit } from 'lib/unit';

import Dialog from 'component/dialog';
import Interactive from 'component/interactive';
import Quantity from 'component/quantity';
import { parse } from 'lib/number';

type Props = {
  readonly name?: string,
  readonly value: Phasor,
  readonly unit?: Unit,
  readonly description: string,
  readonly onChange: (value: Phasor) => void,
};

type State = {
  prompt: boolean,
  mag: string,
  ang: string,
};

export default class extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      prompt: false,
      mag: norm(props.value) + '',
      ang: degrees(angle(props.value)) + '',
    };
  }

  public render() {
    const unit = this.props.unit && (
      <div className='input-group-append'>
        <span className='input-group-text'>
          <span className={classes('unit', this.props.unit)} />
        </span>
      </div>
    );

    return (
      <Interactive action={this.onClick} className={classes('value control', this.props.name)}>
        <Quantity value={this.props.value} unit={this.props.unit} />
        <Dialog
          show={this.state.prompt}
          title={this.props.description}
          onDismiss={this.onDismiss}
          onConfirm={this.onConfirm}
        >
          <div className='form-row'>
            <div className='col input-group'>
              <input value={this.state.mag} onChange={this.onMag} className='form-control' />
              {unit}
            </div>
            <div className='col input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <span className={'symbol angle'} />
                </span>
              </div>
              <input value={this.state.ang} onChange={this.onAng} className='form-control' />
              <div className='input-group-append'>
                <span className='input-group-text'>
                  <span className={'unit degree'} />
                </span>
              </div>
            </div>
          </div>
        </Dialog>
      </Interactive>
    );
  }

  private value = () => polar(parse(this.state.mag), radians(parse(this.state.ang)));

  private onMag = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parse(value))) {
      this.setState({ mag: value.trim() });
    }
  }

  private onAng = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parse(value))) {
      this.setState({ ang: value.trim() });
    }
  }

  private onClick = () => {
    const value = this.value();
    this.setState(() => ({
      prompt: true,
      mag: norm(value) + '',
      ang: degrees(angle(value)) + '',
    }));
  }

  private onDismiss = () => {
    this.setState((_, { value }) => ({
      prompt: false,
      mag: norm(value) + '',
      ang: degrees(angle(value)) + '',
    }));
  }

  private onConfirm = () => this.setState({ prompt: false }, () => this.props.onChange(this.value()));
}
