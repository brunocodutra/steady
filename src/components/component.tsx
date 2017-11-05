import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Actions} from 'action';
import Tile from 'components/tile';
import {Model, Models} from 'model';
import {Phasor, rect} from 'phasor';
import {apply, inv} from 'quadripole';
import {State} from 'reducer';

type PropsBase = {
  readonly id: number[],
  readonly model: Model,
  readonly vi: [Phasor, Phasor],
};

type Props = PropsBase & {
  readonly active: boolean,
  readonly activate: () => void,
};

const mapState = ({schematics: {active}}: State, {id}: PropsBase) => ({
  active: JSON.stringify(active) === JSON.stringify(id),
});

const mapDispatch = (dispatch: Dispatch<any>, props: PropsBase) => ({
  activate: () => {
    dispatch(ActionFactory[Actions.activate](props.id));
  },
});

const Component = connect(mapState, mapDispatch)(
  ({active, activate, model, id, vi}: Props): JSX.Element => {
    const UnhandledModel = (_: never): never => {
      throw new Error('UnhandledModel');
    };

    switch (model.kind) {
      case Models.knee:
      case Models.ground:
        return <Tile className={Models[model.kind]}/>;

      case Models.vsrc:
      case Models.isrc:
      case Models.impedance:
      case Models.admittance:
      case Models.xformer:
      case Models.xline:
      case Models.connector:
        return <Tile active={active} activate={activate} className={Models[model.kind]}/>;

      case Models.series:
        return (
          <Tile>
            {model.components.map((m, k) => {
              const c = <Component id={[...id, k]} model={m} vi={vi} key={k}/>;
              vi = apply(m.params(), vi);
              return c;
            })}
          </Tile>
        );

      case Models.shunt:
        const fill = Array.apply(null, Array(model.indentation + 1))
          .map((_: undefined, k: number) => <Tile key={k}/>);

        return (
          <Tile>
            <Tile
              active={active}
              activate={activate}
              className={classes('d-flex flex-column', Models[model.kind])}
            >
              {fill}
            </Tile>
            <Component
              id={id}
              model={model.branch}
              vi={apply(inv(model.params()), [vi[0], rect(0)])}
            />
          </Tile>
        );

      default:
        return UnhandledModel(model);
    }
  },
);

export default Component;
