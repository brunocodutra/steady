import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Element, Kind} from 'lib/element';
import {Phasor, sub} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {Factory, Type} from 'action';
import {State} from 'reducer';

import Quantity from 'component/quantity';
import Tile from 'component/tile';

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
    dispatch(Factory[Type.activate](props.id));
  },
});

const traverse = ({element, id, vi}: PropsBase): JSX.Element => (
  <>
    <Component id={id} element={element} vi={vi}/>;
    {element.kind !== Kind.connector
      ? traverse({
        element: element.next,
        id: [...id.slice(0, -1), id[id.length - 1] + 1],
        vi: project(element.model, vi),
      })
      : null
    }
  </>
);

const Component = connect(mapState, mapDispatch)(
  ({active, activate, element, id, vi}: Props): JSX.Element => {
    const UnhandledElement = (_: never): never => {
      throw new Error('UnhandledElement');
    };

    switch (element.kind) {
      case Kind.knee:
      case Kind.ground:
        return <Tile className={Kind[element.kind]}/>;

      case Kind.connector:
        return <Tile active={active} activate={activate} className={Kind[element.kind]}/>;

      case Kind.vsrc:
      case Kind.isrc:
      case Kind.impedance:
      case Kind.admittance:
      case Kind.xformer:
        return (
          <Tile active={active} activate={activate} className={Kind[element.kind]}>
            <div className='value'>
              <Quantity value={element.value} unit={element.unit}/>
            </div>
          </Tile>
        );

      case Kind.xline:
        return (
          <Tile active={active} activate={activate} className={Kind[element.kind]}>
            <div className='value'>
              <div className='d-flex flex-column'>
                <span>Z</span>
                <span>γ</span>
              </div>
              <div className='d-flex flex-column mx-1'>
                <span>=</span>
                <span>=</span>
              </div>
              <div className='d-flex flex-column'>
                <Quantity value={element.value[0]} unit={element.unit[0]}/>
                <Quantity value={element.value[1]} unit={element.unit[1]}/>
              </div>
            </div>
          </Tile>
        );

      case Kind.series:
        return traverse({element: element.next, id: [...id.slice(0, -1), id[id.length - 1] + 1], vi});

      case Kind.shunt:
        const fill = Array.apply(null, Array(element.height - element.value.height))
          .map((_: undefined, k: number) => <Tile key={k}/>);

        return (
          <Tile activate={activate}>
            <Tile
              active={active}
              className={classes('d-flex flex-column', Kind[element.kind])}
            >
              {fill}
            </Tile>
            <Component
              id={[...id, 0]}
              element={element.value}
              vi={[vi[0], sub(vi[1], project(element.model, vi)[1])]}
            />
          </Tile>
        );

      default:
        return UnhandledElement(element);
    }
  },
);

export default Component;
