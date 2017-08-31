import * as classes from 'classnames';
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
  class extends React.PureComponent< Props, {} > {
    public render(): JSX.Element {
      const UnhandledModel = (_: never): never => {
        throw new Error('UnhandledModel');
      };

      switch (this.props.model.kind) {
        case Models.ground:
          return <Tile className={Models[this.props.model.kind]}/>;

        case Models.vsrc:
        case Models.isrc:
        case Models.impedance:
        case Models.admittance:
        case Models.xformer:
        case Models.xline:
        case Models.placeholder:
          return (
            <Tile
              active={this.props.active}
              activate={this.props.activate}
              className={Models[this.props.model.kind]}
            />
          );

        case Models.series:
          return (
            <Tile>
              {this.props.model.components.map((model, i) => (
                <Component id={[...this.props.id, i]} model={model} key={i}/>
              ))}
            </Tile>
          );

        case Models.shunt:
          const fill = Array.apply(null, Array(this.props.model.indentation + 1))
            .map((_: undefined, i: number) => <Tile key={i}/>);

          return (
            <Tile>
              <Tile
                active={this.props.active}
                activate={this.props.activate}
                className={classes('d-flex flex-column', Models[this.props.model.kind])}
              >
                {fill}
              </Tile>
              <Tile>
                <Tile className='knee'/>
                {this.props.model.components.map((model, i) => (
                  <Component id={[...this.props.id, i]} model={model} key={i}/>
                ))}
              </Tile>
            </Tile>
          );

        default:
          return UnhandledModel(this.props.model);
      }
    }
  },
);

export default Component;
