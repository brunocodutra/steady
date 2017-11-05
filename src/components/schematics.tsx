import * as React from 'react';
import {connect} from 'react-redux';

import {Model} from 'model';
import {rect} from 'phasor';
import {solve} from 'quadripole';
import {State} from 'reducer';

import Component from 'components/component';

type Props = {
  readonly entry: Model,
};

const mapState = ({schematics: {entry}}: State): Props => ({
  entry,
});

export default connect(mapState)(
  ({entry}: Props) => (
    <Component id={[]} model={entry} vi={[rect(0), solve(entry.params())[1]]}/>
  ),
);
