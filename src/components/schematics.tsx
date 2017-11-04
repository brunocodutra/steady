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

const mapState = ({schematics}: State): Props => ({
  entry: schematics,
});

export default connect(mapState)(
  ({entry}: Props) => (
    <div className='schematics board flex-grow border rounded p-3' tabIndex={-1}>
      <Component id={[]} model={entry} vi={[rect(0), solve(entry.params)[1]]}/>
    </div>
  ),
);
