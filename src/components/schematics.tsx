import * as React from 'react';
import {connect} from 'react-redux';

import {expand, ExpandedElement} from 'model';
import {rect} from 'phasor';
import {solve} from 'quadripole';
import {State} from 'reducer';

import Component from 'components/component';

type Props = {
  readonly entry: ExpandedElement,
};

const mapState = ({schematics: {entry}}: State): Props => ({
  entry: expand(entry),
});

export default connect(mapState)(
  ({entry}: Props) => (
    <Component id={[]} element={entry} vi={[rect(0), solve(entry.model)[1]]}/>
  ),
);
