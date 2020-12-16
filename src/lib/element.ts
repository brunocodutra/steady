import * as Phasors from 'lib/phasor';
import { _0, _1, Phasor, polar } from 'lib/phasor';
import { cascade, eye, project, Quadripole, quadripole, solve } from 'lib/quadripole';
import { json, memoized } from 'lib/decorator';
import { traverse } from 'lib/util';

export enum Kind {
  terminal = 'terminal',
  ground = 'ground',
  vsrc = 'vsrc',
  isrc = 'isrc',
  impedance = 'impedance',
  admittance = 'admittance',
  xformer = 'xformer',
  line = 'line',
  series = 'series',
  shunt = 'shunt',
}

export const isKind = (k: unknown): k is Kind => typeof k === 'string' && k in Kind;

abstract class Electric {
  @memoized
  get model(): Quadripole {
    return quadripole();
  }
}

abstract class Connected<E extends ConnectedElement> extends Electric {
  readonly abstract next: E['next'];

  @memoized
  get subcircuits(): number {
    return this.next.subcircuits;
  }

  connect(next: E['next']): E {
    return Object.assign(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)), { next });
  }
}

abstract class Parametric<E extends ParametricElement> extends Connected<E> {
  readonly abstract value: E['value'];

  update(value: E['value']): E {
    return Object.assign(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)), { value });
  }
}

@json
export class Terminal extends Electric {
  readonly kind = Kind.terminal;

  get subcircuits(): 1 {
    return 1;
  }
}

@json
export class Ground extends Connected<Ground> {
  readonly kind = Kind.ground;
  constructor(
    readonly next: Element,
  ) {
    super();
  }
}

@json
export class VSrc extends Parametric<VSrc> {
  readonly kind = Kind.vsrc;
  constructor(
    readonly next: Element,
    readonly value: Phasor,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return quadripole(eye, [this.value, _0]);
  }
}

@json
export class ISrc extends Parametric<ISrc> {
  readonly kind = Kind.isrc;
  constructor(
    readonly next: Element,
    readonly value: Phasor,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return quadripole(eye, [_0, this.value]);
  }
}

@json
export class Impedance extends Parametric<Impedance> {
  readonly kind = Kind.impedance;
  constructor(
    readonly next: Element,
    readonly value: Phasor,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return quadripole([[_1, this.value.neg()], [_0, _1]]);
  }
}

@json
export class Admittance extends Parametric<Admittance> {
  readonly kind = Kind.admittance;
  constructor(
    readonly next: Element,
    readonly value: Phasor,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return quadripole([[_1, _0], [this.value.recip().neg(), _1]]);
  }
}

@json
export class XFormer extends Parametric<XFormer> {
  readonly kind = Kind.xformer;
  constructor(
    readonly next: Element,
    readonly value: Phasor,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return quadripole([[this.value.recip(), _0], [_0, this.value]]);
  }
}

@json
export class Line extends Parametric<Line> {
  readonly kind = Kind.line;
  constructor(
    readonly next: Element,
    readonly value: { y: Phasor, z: Phasor },
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    const { y, z } = this.value;
    return quadripole([[y.cosh(), y.sinh().mul(z).neg()], [y.sinh().div(z).neg(), y.cosh()]]);
  }
}

@json
export class Series extends Connected<Series> {
  readonly kind = Kind.series;
  constructor(
    readonly next: Element,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return traverse(this.next).map((e) => e.model).reduce(cascade);
  }
}

@json
export class Shunt extends Connected<Shunt> {
  readonly kind = Kind.shunt;
  constructor(
    readonly next: Element,
    readonly branch: Series,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    return quadripole(
      [[_1, _0], [this.branch.model.r[1][0].div(this.branch.model.r[1][1]), _1]],
      [_0, this.branch.model.t[1].div(this.branch.model.r[1][1])],
    );
  }

  @memoized
  get subcircuits(): number {
    return this.next.subcircuits + this.branch.subcircuits;
  }
}

type ParametricElement = VSrc | ISrc | Impedance | Admittance | XFormer | Line
type ConnectedElement = Ground | Series | Shunt | ParametricElement;
export type Element = Terminal | ConnectedElement;

export const terminal = (): Terminal => new Terminal();
export const ground = (next: Element = terminal()): Ground => new Ground(next);
export const vsrc = (next: Element = terminal(), value = _0): VSrc => new VSrc(next, value);
export const isrc = (next: Element = terminal(), value = _0): ISrc => new ISrc(next, value);
export const impedance = (next: Element = terminal(), value = _0): Impedance => new Impedance(next, value);
export const admittance = (next: Element = terminal(), value = polar(Infinity)): Admittance => new Admittance(next, value);
export const xformer = (next: Element = terminal(), value = _1): XFormer => new XFormer(next, value);
export const line = (next: Element = terminal(), value = { y: _0, z: _1 }): Line => new Line(next, value);
export const series = (next: Element = terminal()): Series => new Series(next);
export const shunt = (next: Element = terminal(), branch = series()): Shunt => new Shunt(next, branch);

export const make = (kind: Kind): Element => {
  switch (kind) {
    case Kind.terminal:
      return terminal();
    case Kind.ground:
      return ground();
    case Kind.vsrc:
      return vsrc();
    case Kind.isrc:
      return isrc();
    case Kind.impedance:
      return impedance();
    case Kind.admittance:
      return admittance();
    case Kind.xformer:
      return xformer();
    case Kind.line:
      return line();
    case Kind.series:
      return series();
    case Kind.shunt:
      return shunt();
  }
};

export const next = (element: Element): Element => {
  if (element instanceof Connected) {
    return element.next;
  } else {
    throw new Error(`unexpected '${element.kind}'`);
  }
};

export const connect = (element: Element, next: Element): ConnectedElement => {
  if (element instanceof Connected) {
    return element.connect(next);
  } else {
    throw new Error(`unexpected '${element.kind}'`);
  }
};

export const branch = (element: Element): Series => {
  if (element instanceof Shunt) {
    return element.branch;
  } else {
    throw new Error(`expected '${Kind.shunt}', got '${element.kind}'`);
  }
};

export const merge = (element: Element, branch: Element): Shunt => {
  if (element.kind !== Kind.shunt) {
    throw new Error(`expected '${Kind.shunt}', got '${element.kind}'`);
  }

  if (branch.kind !== Kind.series) {
    throw new Error(`expected '${Kind.series}', got '${branch.kind}'`);
  }

  return shunt(element.next, branch);
};

export const update = (element: Element, value: ParametricElement['value']): ParametricElement => {
  if (element instanceof Line) {
    if (!(value instanceof Phasor)) {
      return element.update(value);
    }
  } else if (element instanceof Parametric) {
    if (value instanceof Phasor) {
      return element.update(value);
    }
  }

  throw new Error(`cannot update element of kind '${element.kind}' with value '${value}'`);
};

export const pack = (element?: Element): unknown => {
  switch (element?.kind) {
    case Kind.terminal:
      return [Object.keys(Kind).indexOf(element.kind)];
    case Kind.ground:
    case Kind.series:
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next)];
    case Kind.vsrc:
    case Kind.isrc:
    case Kind.impedance:
    case Kind.admittance:
    case Kind.xformer:
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next), Phasors.pack(element.value)];

    case Kind.line: {
      const { y, z } = element.value;
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next), [Phasors.pack(y), Phasors.pack(z)]];
    }

    case Kind.shunt:
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next), pack(element.branch)];

    case undefined:
      return [];
  }
};

export const unpack = (packed: unknown): Element => {
  if (!Array.isArray(packed) || !packed.length || packed.length > 3) {
    throw new Error(`expected '[kind, next?, value?]', got ${packed}`);
  }

  const kind = Object.keys(Kind)[packed[0]];

  if (!isKind(kind)) {
    throw new Error(`unknown element kind '${kind}'`);
  }

  switch (kind) {
    case Kind.terminal:
      return terminal();

    case Kind.ground:
    case Kind.series:
      return connect(make(kind), unpack(packed[1]));

    case Kind.vsrc:
    case Kind.isrc:
    case Kind.impedance:
    case Kind.admittance:
    case Kind.xformer:
      return update(connect(make(kind), unpack(packed[1])), Phasors.unpack(packed[2]));

    case Kind.line: {
      /* istanbul ignore next */
      if (!Array.isArray(packed[2]) || packed[2].length !== 2) {
        throw new Error(`expected '[y, z]', got ${packed}`);
      }

      const value = {
        y: Phasors.unpack(packed[2][0]),
        z: Phasors.unpack(packed[2][1]),
      };

      return update(connect(make(kind), unpack(packed[1])), value);
    }

    case Kind.shunt:
      return merge(connect(make(kind), unpack(packed[1])), unpack(packed[2]));
  }
};

export type Energized<E extends Element = Element> =
  E extends Element
  ? {
    readonly [P in Exclude<keyof E, 'next' | 'branch'>]: E[P];
  } & {
    readonly [P in Extract<keyof E, 'next' | 'branch'>]: Energized<Element>;
  } & {
    readonly vi: [Phasor, Phasor],
  }
  : never
  ;

export const energize = (element: Element, vi: [Phasor, Phasor] = [_0, solve(element.model)[1]]): Energized<Element> => {
  switch (element.kind) {
    case Kind.terminal:
      return Object.assign(Object.create(element), { vi });
    case Kind.ground:
    case Kind.vsrc:
    case Kind.isrc:
    case Kind.impedance:
    case Kind.admittance:
    case Kind.xformer:
    case Kind.line:
      return Object.assign(Object.create(element), {
        next: energize(element.next, project(element.model, vi)),
        vi,
      });
    case Kind.series:
      return Object.assign(Object.create(element), {
        next: energize(element.next, vi),
        vi,
      });
    case Kind.shunt:
      const next = energize(element.next, project(element.model, vi));
      const branch = energize(element.branch, [vi[0], vi[1].sub(next.vi[1])]);
      return Object.assign(Object.create(element), { vi, next, branch });
  }
};
