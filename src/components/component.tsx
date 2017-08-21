import * as React from 'react';
import {connect} from 'react-redux';

import Tile from 'components/tile';
import {Model, Models} from 'model';
import {State} from 'reducer';

type PropsBase = {
  readonly id: number[],
  readonly model: Model,
};

type Props = PropsBase & {readonly active: boolean};

const mapState = ({active}: State, {id}: PropsBase) => ({
  active: JSON.stringify(active) === JSON.stringify(id),
});

const Component = connect(mapState)(
  class extends React.Component< Props, {} > {
    public render(): JSX.Element {
      const UnhandledModel = (_: never): never => {
        throw new Error('UnhandledModel');
      };

      switch (this.props.model.kind) {
        case Models.GROUND:
          return (
            <Tile>
              <span className='ground'/>
            </Tile>
          );

        case Models.PLACEHOLDER:
          return (
            <Tile active={this.props.active} interactive={true}>
              <span className='placeholder'/>
            </Tile>
          );

        case Models.SERIES:
          return (
            <Tile>
              {this.props.model.components.map((model, i) => (
                <Component id={[...this.props.id, i]} model={model} key={i}/>),
              )}
            </Tile>
          );

        default:
          return UnhandledModel(this.props.model);
      }
    }
  },
);

export default Component;
