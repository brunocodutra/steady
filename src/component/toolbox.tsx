import classes from 'classnames';
import React from 'react';

import Toggler from 'component/toggler';
import Tool from 'component/tool';
import { Kind } from 'lib/element';

import { Icon as Admittance } from 'component/element/admittance';
import { Icon as Impedance } from 'component/element/impedance';
import { Icon as ISrc } from 'component/element/isrc';
import { Icon as Line } from 'component/element/line';
import { Icon as Shunt } from 'component/element/shunt';
import { Icon as VSrc } from 'component/element/vsrc';
import { Icon as XFormer } from 'component/element/xformer';

type Props = {};

type State = {
  open: boolean,
};

export default class extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  public render() {
    const { open } = this.state;

    return (
      <>
        <Toggler toggle={this.toggle} />
        <div className={classes('toolbox', { open })}>
          <Tool kind={Kind.vsrc}><VSrc /></Tool>
          <Tool kind={Kind.isrc}><ISrc /></Tool>
          <Tool kind={Kind.impedance}><Impedance /></Tool>
          <Tool kind={Kind.admittance}><Admittance /></Tool>
          <Tool kind={Kind.xformer}><XFormer /></Tool>
          <Tool kind={Kind.line}><Line /></Tool>
          <Tool kind={Kind.shunt}><Shunt /></Tool>
        </div>
      </>
    );
  }

  private toggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  }
}
