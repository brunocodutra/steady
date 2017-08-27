import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {activate} from 'action';
import Tile from 'components/tile';
import {Model, Models} from 'model';
import {State} from 'reducer';

type PropsBase = {
  readonly id: number[],
  readonly model: Model,
};

type Props = PropsBase & {
  readonly active: boolean,
  readonly activate: () => void,
};

const mapState = ({active}: State, {id}: PropsBase) => ({
  active: JSON.stringify(active) === JSON.stringify(id),
});

const mapDispatch = (dispatch: Dispatch<any>, props: PropsBase) => ({
  activate: () => {
    dispatch(activate(props.id));
  },
});

const Component = connect(mapState, mapDispatch)(
  class extends React.Component< Props, {} > {
    public render(): JSX.Element {
      const UnhandledModel = (_: never): never => {
        throw new Error('UnhandledModel');
      };

      switch (this.props.model.kind) {
        case Models.ground:
          return (
            <Tile>
              <span className={Models[this.props.model.kind]}/>
            </Tile>
          );

        case Models.vsrc:
        case Models.isrc:
        case Models.impedance:
        case Models.admittance:
        case Models.xformer:
        case Models.placeholder:
          return (
            <Tile active={this.props.active} onClick={this.props.activate}>
              <span className={Models[this.props.model.kind]}/>
            </Tile>
          );

        case Models.series:
          return (
            <Tile>
              <span>
                {this.props.model.components.map((model, i) => (
                  <Component id={[...this.props.id, i]} model={model} key={i}/>),
                )}
              </span>
            </Tile>
          );

        default:
          return UnhandledModel(this.props.model);
      }
    }
  },
);

export default Component;
