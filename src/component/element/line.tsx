import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';

import {Line} from 'lib/element';
import {Unit} from 'lib/unit';

const frame = '\
M556.12373 1000.5018A109.87627 499.49774 0 0 0 666 1499.9995a109.87627 \
499.49774 0 0 0 109.87627-499.4977A109.87627 499.49774 0 0 0 666 \
501.00403a109.87627 499.49774 0 0 0-109.87627 499.49777zM666 1499.9996l1667 \
.0006m0-999.0004H666M0 2334.0001h333V1334h333m1667 165.9954a109.87627 \
499.49774 0 0 0 95.1556-249.7489 109.87627 499.49774 0 0 0 \
0-499.49775A109.87627 499.49774 0 0 0 2333 500.99988M0 667h666m2333.9999 \
0h-585.2013m585.2013 1667.0001h-334V1334h-251.2022';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={frame}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<Line>;

export default parametric<Line>(
  ({vi: [v, i], element, active, activate, remove, update}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <Value
        name={'y'}
        value={element.value.y}
        description={'propagation constant'}
        onChange={(y) => update({...element.value, y})}
      />
      <Value
        name={'z'}
        value={element.value.z}
        description={'characteristic impedance'}
        unit={Unit.ohm}
        onChange={(z) => update({...element.value, z})}
      />
      <Status value={v} unit={Unit.volt}/>
      <Status value={i} unit={Unit.ampere}/>
    </Tile>
  ),
);
