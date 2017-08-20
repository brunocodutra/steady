import * as React from 'react';
import {connect} from 'react-redux';

import {Model} from 'model';
import {State} from 'reducer';

import Component from 'components/component';

type Props = {
  readonly entry: Model,
};

const mapState = ({schematics}: State): Props => ({
  entry: schematics,
});

export default connect(mapState)(
  class extends React.Component< Props, {} > {
    public render() {
      return (
        <div className='schematics board flex-grow border rounded p-3'>
          <Component id={[]} model={this.props.entry}/>
        </div>
      );
    }
});
