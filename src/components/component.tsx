import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Actions} from 'action';
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
    dispatch(ActionFactory[Actions.activate](props.id));
  },
});

const Component = connect(mapState, mapDispatch)(
  ({active, activate, model, id}: Props): JSX.Element => {
    const UnhandledModel = (_: never): never => {
      throw new Error('UnhandledModel');
    };

    switch (model.kind) {
      case Models.ground:
        return <Tile className={Models[model.kind]}/>;

      case Models.vsrc:
      case Models.isrc:
      case Models.impedance:
      case Models.admittance:
      case Models.xformer:
      case Models.xline:
      case Models.placeholder:
        return <Tile active={active} activate={activate} className={Models[model.kind]}/>;

      case Models.series:
        return (
          <Tile>
            {model.components.map((m, i) => <Component id={[...id, i]} model={m} key={i}/>)}
          </Tile>
        );

      case Models.shunt:
        const fill = Array.apply(null, Array(model.indentation + 1))
          .map((_: undefined, i: number) => <Tile key={i}/>);

        return (
          <Tile>
            <Tile
              active={active}
              activate={activate}
              className={classes('d-flex flex-column', Models[model.kind])}
            >
              {fill}
            </Tile>
            <Tile>
              <Tile className='knee'/>
              {model.components.map((m, i) => <Component id={[...id, i]} model={m} key={i}/>)}
            </Tile>
          </Tile>
        );

      default:
        return UnhandledModel(model);
    }
  },
);

export default Component;
