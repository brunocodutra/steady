import React from 'react';

import { Element, Kind } from 'lib/element';
import { Phasor } from 'lib/phasor';

import Admittance from 'component/element/admittance';
import Connector from 'component/element/connector';
import Ground from 'component/element/ground';
import Impedance from 'component/element/impedance';
import ISrc from 'component/element/isrc';
import Line from 'component/element/line';
import Series from 'component/element/series';
import Shunt from 'component/element/shunt';
import VSrc from 'component/element/vsrc';
import XFormer from 'component/element/xformer';

export type Props<E extends Element = Element> = {
  readonly id: number[],
  readonly element: E,
  readonly vi: [Phasor, Phasor],
};

export default ({ id, element, vi }: Props): JSX.Element => {
  switch (element.kind) {
    case Kind.ground:
      return <Ground id={id} element={element} vi={vi} />;

    case Kind.connector:
      return <Connector id={id} element={element} vi={vi} />;

    case Kind.vsrc:
      return <VSrc id={id} element={element} vi={vi} />;

    case Kind.isrc:
      return <ISrc id={id} element={element} vi={vi} />;

    case Kind.impedance:
      return <Impedance id={id} element={element} vi={vi} />;

    case Kind.admittance:
      return <Admittance id={id} element={element} vi={vi} />;

    case Kind.xformer:
      return <XFormer id={id} element={element} vi={vi} />;

    case Kind.line:
      return <Line id={id} element={element} vi={vi} />;

    case Kind.series:
      return <Series id={id} element={element} vi={vi} />;

    case Kind.shunt:
      return <Shunt id={id} element={element} vi={vi} />;
  }
};
