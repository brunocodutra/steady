import { _0, _1, Inf, Phasor } from 'lib/phasor';
import { cascade, eye, project, Quadripole, quadripole, solve } from 'lib/quadripole';
import { json, memoized } from 'lib/decorator';
import { hasProperty, traverse } from 'lib/util';

export enum Kind {
  terminal = 'terminal',
  vsrc = 'vsrc',
  isrc = 'isrc',
  impedance = 'impedance',
  admittance = 'admittance',
  xformer = 'xformer',
  line = 'line',
  shunt = 'shunt',
}

export const isKind = (k: unknown): k is Kind => typeof k === 'string' && k in Kind;

export abstract class Electric<E extends Element> {
  abstract get model(): Quadripole;

  @memoized
  get equivalent(): Quadripole {
    return traverse(this).map((e) => e.model).reduce(cascade);
  }

  power(vi: [Phasor, Phasor] = [_0, solve(this.equivalent)[1]]): Powered<E> {
    return Object.assign(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)), { vi });
  }

  static fromKind(kind: Element['kind']): Element {
    switch (kind) {
      case Kind.terminal:
        return terminal();
      default:
        return Connected.fromKind(kind);
    }
  }
}

export abstract class Connected<E extends ConnectedElement> extends Electric<E> {
  readonly abstract next: E['next'];

  @memoized
  get subcircuits(): number {
    return this.next.subcircuits;
  }

  connect(next: E['next']): E {
    return Object.assign(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)), { next });
  }

  power(vi?: [Phasor, Phasor]): Powered<E> {
    const powered = super.power(vi);
    return Object.assign(Object.create(Object.getPrototypeOf(powered), Object.getOwnPropertyDescriptors(powered)), {
      next: this.next.power(project(powered.model, powered.vi))
    });
  }

  static fromKind(kind: ConnectedElement['kind']): ConnectedElement {
    switch (kind) {
      case Kind.shunt:
        return shunt();
      default:
        return Parametric.fromKind(kind)
    }
  }
}

export abstract class Parametric<E extends ParametricElement> extends Connected<E> {
  readonly abstract value: E['value'];

  update(value: E['value']): E {
    return Object.assign(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)), { value });
  }

  static fromKind(kind: ParametricElement['kind']): ParametricElement {
    switch (kind) {
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
    }
  }
}

@json
export class Terminal extends Electric<Terminal> {
  readonly kind = Kind.terminal;

  @memoized
  get model(): Quadripole {
    return quadripole();
  }

  get subcircuits(): 1 {
    return 1;
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
export class Shunt extends Connected<Shunt> {
  readonly kind = Kind.shunt;
  constructor(
    readonly next: Element,
    readonly branch: Element,
  ) {
    super();
  }

  @memoized
  get model(): Quadripole {
    const { r, t } = this.branch.equivalent;
    return quadripole(
      [[_1, _0], [r[1][0].div(r[1][1]), _1]],
      [_0, t[1].div(r[1][1])],
    );
  }

  @memoized
  get subcircuits(): number {
    return this.next.subcircuits + this.branch.subcircuits;
  }

  power(vi?: [Phasor, Phasor]): Powered<Shunt> {
    const powered = super.power(vi);
    return Object.assign(Object.create(Object.getPrototypeOf(powered), Object.getOwnPropertyDescriptors(powered)), {
      branch: this.branch.power([powered.vi[0], powered.vi[1].sub(powered.next.vi[1])])
    });
  }

  merge(branch: Element): Shunt {
    return Object.assign(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)), { branch });
  }
}

export type ParametricElement = VSrc | ISrc | Impedance | Admittance | XFormer | Line
export type ConnectedElement = Shunt | ParametricElement;
export type Element = Terminal | ConnectedElement;

export type Powered<E extends Element = Element> =
  E extends Element
  ? {
    readonly [P in Exclude<keyof E, 'next' | 'branch'>]: E[P];
  } & {
    readonly [P in Extract<keyof E, 'next' | 'branch'>]: Powered<Element>;
  } & {
    readonly vi: [Phasor, Phasor],
  }
  : never
  ;

export type Value = ParametricElement['value'];

namespace Value {
  export const fromJSON = (json: unknown): Value => {
    if (
      typeof json === 'object' && json !== null &&
      hasProperty(json, 'y') && hasProperty(json, 'z')
    ) {
      return {
        y: Phasor.fromJSON(json.y),
        z: Phasor.fromJSON(json.z),
      };
    } else {
      return Phasor.fromJSON(json);
    }
  }
}

export const terminal = (): Terminal => new Terminal();
export const vsrc = (next: Element = terminal(), value = _0): VSrc => new VSrc(next, value);
export const isrc = (next: Element = terminal(), value = _0): ISrc => new ISrc(next, value);
export const impedance = (next: Element = terminal(), value = _0): Impedance => new Impedance(next, value);
export const admittance = (next: Element = terminal(), value = Inf): Admittance => new Admittance(next, value);
export const xformer = (next: Element = terminal(), value = _1): XFormer => new XFormer(next, value);
export const line = (next: Element = terminal(), value = { y: _0, z: _1 }): Line => new Line(next, value);
export const shunt = (next: Element = terminal(), branch: Element = terminal()): Shunt => new Shunt(next, branch);

export namespace Element {
  export const fromKind = (kind: Kind): Element => Electric.fromKind(kind);

  export const fromJSON = (json: unknown): Element => {
    if (typeof json !== 'object' || json === null || !hasProperty(json, 'kind') || !isKind(json.kind)) {
      throw new Error(`expected Element, got '${json}'`);
    }

    const electric = fromKind(json.kind);

    if (!hasProperty(json, 'next') || !(electric instanceof Connected)) {
      return electric;
    }

    const connected = electric.connect(fromJSON(json.next));

    if (hasProperty(json, 'branch') && connected instanceof Shunt) {
      return connected.merge(fromJSON(json.branch));
    }

    if (hasProperty(json, 'value') && connected instanceof Parametric) {
      return update(connected, Value.fromJSON(json.value));
    }

    return connected;
  };
}

export const update = (element: Element, value: Value): ParametricElement => {
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
