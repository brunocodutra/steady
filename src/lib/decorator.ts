import { Json } from "lib/serde";

export const memoized = (_: unknown, prop: string, descriptor: PropertyDescriptor): void => {
  const { get, set } = descriptor;

  if (set || !get) {
    throw new Error(`cannot memoize mutable property '${prop}'`);
  }

  const memory = new WeakMap();
  descriptor.get = function () {
    return memory.get(this) ?? memory.set(this, get.call(this)).get(this);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const json = <T extends new (...args: any[]) => any>(target: T) => class extends target {
  toJSON(): Json {
    const json: Json = {};

    for (const k in this) {
      json[k] = this[k];
    }

    return json;
  }
}