import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Actions} from 'action';
import Tile from 'components/tile';
import {Element, Elements} from 'model';
import {Phasor, rect} from 'phasor';
import {apply, inv} from 'quadripole';
import {State} from 'reducer';

type PropsBase = {
  readonly id: number[],
  readonly element: Element,
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
  ({active, activate, element, id, vi}: Props): JSX.Element => {
    const UnhandledElement = (_: never): never => {
      throw new Error('UnhandledElement');
    };

    switch (element.kind) {
      case Elements.knee:
      case Elements.ground:
        return <Tile className={Elements[element.kind]}/>;

      case Elements.vsrc:
      case Elements.isrc:
      case Elements.impedance:
      case Elements.admittance:
      case Elements.xformer:
      case Elements.xline:
      case Elements.connector:
        return <Tile active={active} activate={activate} className={Elements[element.kind]}/>;

      case Elements.series:
        return (
          <Tile>
            {element.elements.map((e, k) => {
              const c = <Component id={[...id, k]} element={e} vi={vi} key={k}/>;
              vi = apply(e.model(), vi);
              return c;
            })}
          </Tile>
        );

      case Elements.shunt:
        const fill = Array.apply(null, Array(element.indentation + 1))
          .map((_: undefined, k: number) => <Tile key={k}/>);

        return (
          <Tile>
            <Tile
              active={active}
              activate={activate}
              className={classes('d-flex flex-column', Elements[element.kind])}
            >
              {fill}
            </Tile>
            <Component
              id={id}
              element={element.branch}
              vi={apply(inv(element.model()), [vi[0], rect(0)])}
            />
          </Tile>
        );

      default:
        return UnhandledElement(element);
    }
  },
);

export default Component;
